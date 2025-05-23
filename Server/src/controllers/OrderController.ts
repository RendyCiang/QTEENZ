import { RequestHandler, response } from "express";
import { prisma } from "../config/config";
import { AppError } from "../utils/http/AppError";
import { STATUS } from "../utils/http/statusCodes";
import { Status_Pickup } from "@prisma/client";
import midtransClient from "midtrans-client";
const axios = require("axios");

type MenuItem = {
  menuId: string;
  menuVariantId: string;
  quantity: number;
  price: number;
  subtotalPerMenu: number;
  pricePerMenu: number;
};

type OrderDetail = {
  orderId: string;
  status: string;
  totalPrice: number;
  transactionStatus: string;
  menuDetails: {
    menuName: string;
    variantName: string;
    quantity: number;
  }[];
};

const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY || "",
  clientKey: process.env.MIDTRANS_CLIENT_KEY || "",
});

const getOrderBuyer: RequestHandler = async (request, response, next) => {
  try {
    const requesterId = request.body.payload.id;

    const buyer = await prisma.buyer.findUnique({
      where: { userId: requesterId },
      select: {
        id: true, // Fetch the buyer's ID
        first_name: true, // Fetch the first name
        last_name: true, // Fetch the last name
        order: {
          select: {
            id: true,
            total_menu: true,
            total_price: true,
            status: true,
            status_pickup: true,
            delivery_status: true,
            orderItem: {
              select: {
                quantity: true,
                subtotalPerMenu: true,
                pricePerMenu: true,
                menuVariant: {
                  select: {
                    name: true,
                    menu: {
                      select: {
                        name: true,
                      },
                    },
                  },
                },
              },
            },
            transaction: {
              select: {
                id: true,
                total_price: true,
                status_payment: true,
              },
            },
          },
        },
      },
    });

    if (!buyer) {
      throw new AppError("User Not Found", STATUS.NOT_FOUND);
    }

    const orders = buyer.order.map((order) => ({
      ...order,
      buyerId: buyer.id,
      buyerName: `${buyer.first_name} ${buyer.last_name}`,
    }));

    response.send({
      message: "Orders fetched successfully",
      orders: orders,
    });
  } catch (error) {
    next(error);
  }
};

const getOrderBuyerById: RequestHandler = async (request, response, next) => {
  try {
    const requesterId = request.body.payload.id;
    const { id } = request.params;

    if (!id) {
      throw new AppError("Transaction ID is required", STATUS.BAD_REQUEST);
    }

    const buyer = await prisma.buyer.findUnique({
      where: {
        userId: requesterId,
      },
    });

    if (!buyer) {
      throw new AppError("User Not Found", STATUS.NOT_FOUND);
    }

    const transaction = await prisma.transaction.findUnique({
      where: {
        id,
      },
      include: {
        order: {
          select: {
            id: true,
            total_menu: true,
            total_price: true,
            status: true,
            status_pickup: true,
            delivery_status: true,
            buyerId: true,
            orderItem: {
              select: {
                id: true,
                menuVariantId: true,
                quantity: true,
                subtotalPerMenu: true,
                pricePerMenu: true,
                menuVariant: {
                  select: {
                    id: true,
                    name: true,
                    menu: {
                      select: {
                        id: true,
                        name: true,
                        vendorId: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!transaction) {
      throw new AppError("Transaction not found", STATUS.NOT_FOUND);
    }

    if (transaction.order?.buyerId !== buyer.id) {
      throw new AppError("Access denied", STATUS.FORBIDDEN);
    }

    response.send({
      message: "Transaction fetched successfully",
      transaction,
    });
  } catch (error) {
    next(error);
  }
};

const getOrderVendor: RequestHandler = async (request, response, next) => {
  try {
    const vendorId = request.body.payload.id;

    const vendor = await prisma.vendor.findUnique({
      where: {
        userId: vendorId,
      },
      include: {
        menu: {
          include: {
            menuVariants: {
              include: {
                orderItem: {
                  include: {
                    order: {
                      select: {
                        id: true,
                        status: true,
                        total_price: true,
                        status_pickup: true,
                        delivery_status: true,
                        transaction: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!vendor) {
      throw new AppError("Vendor Not Found", STATUS.NOT_FOUND);
    }

    interface OrderDetail {
      orderId: string;
      status: string;
      statusPickup: string;
      deliveryStatus: boolean;
      totalPrice: number;
      transactionStatus: string;
      menuDetails: {
        menuName: string;
        variantName: string;
        quantity: number;
      }[];
    }

    const orders = vendor.menu.flatMap((menuItem) =>
      menuItem.menuVariants.flatMap((variant) =>
        variant.orderItem.map((orderItem) => ({
          orderId: orderItem.order.id,
          order: orderItem.order,
          statusPickup: orderItem.order.status_pickup,
          deliveryStatus: orderItem.order.delivery_status,
          transaction: orderItem.order.transaction,
          menuName: menuItem.name,
          variantName: variant.name,
          quantity: orderItem.quantity,
        }))
      )
    );

    const orderDetails: OrderDetail[] = orders.reduce((acc, order) => {
      const existingOrder = acc.find((o) => o.orderId === order.orderId);
      if (existingOrder) {
        existingOrder.menuDetails.push({
          menuName: order.menuName,
          variantName: order.variantName,
          quantity: order.quantity,
        });
      } else {
        acc.push({
          orderId: order.orderId,
          status: order.order.status,
          statusPickup: order.statusPickup,
          deliveryStatus: order.deliveryStatus,
          totalPrice: order.order.total_price,
          transactionStatus:
            order.transaction?.status_payment ?? "No transaction",
          menuDetails: [
            {
              menuName: order.menuName,
              variantName: order.variantName,
              quantity: order.quantity,
            },
          ],
        });
      }

      return acc;
    }, [] as OrderDetail[]);

    response.send({
      message: "Orders and transactions fetched successfully",
      orders: orderDetails,
    });
  } catch (error) {
    next(error);
  }
};

const createOrder: RequestHandler = async (request, response, next) => {
  try {
    const requesterId = request.body.payload.id;
    const { items, deliveryCriteria } = request.body;

    if (!requesterId) {
      throw new AppError("Unauthorized", STATUS.UNAUTHORIZED);
    }

    if (!items || items.length === 0) {
      throw new AppError("Order items is required", STATUS.BAD_REQUEST);
    }

    if (items.some((item: MenuItem) => !item.menuVariantId)) {
      throw new AppError(
        "Order items must be from same vendor",
        STATUS.BAD_REQUEST
      );
    }

    const buyer = await prisma.buyer.findUnique({
      where: {
        userId: requesterId,
      },
    });

    if (!buyer) {
      throw new AppError("Buyer Not Found", STATUS.NOT_FOUND);
    }

    const menuVariants = await prisma.menuVariant.findMany({
      where: {
        id: {
          in: items.map((item: MenuItem) => item.menuVariantId),
        },
      },
      select: {
        id: true,
        price: true,
        menuId: true,
        menu: {
          select: {
            vendorId: true,
            name: true,
          },
        },
      },
    });

    if (menuVariants.length !== items.length) {
      throw new AppError(
        "One or more menuVariant Id are invalid",
        STATUS.BAD_REQUEST
      );
    }

    const selectedVendorId = menuVariants[0].menu.vendorId;

    const isSameVendor = menuVariants.every(
      (item) => item.menu.vendorId === selectedVendorId
    );

    if (!isSameVendor) {
      throw new AppError(
        "Order must contain items from the same vendor",
        STATUS.BAD_REQUEST
      );
    }

    const menuItem = items.map((item: MenuItem) => {
      const variant = menuVariants.find(
        (variant) => variant.id === item.menuVariantId
      );
      return {
        menuId: variant!.menuId,
        menuName: variant!.menu.name,
        menuVariantId: variant!.id,
        price: variant!.price,
        quantity: item.quantity,
        subtotalPerMenu: variant!.price * item.quantity,
        pricePerMenu: variant!.price,
      };
    });

    const totalMenu = menuItem.reduce(
      (total: number, item: { quantity: number }) => total + item.quantity,
      0
    );

    const totalPrice = menuItem.reduce(
      (total: number, item: { price: number; quantity: number }) =>
        total + item.price * item.quantity,
      0
    );

    const deliveryAvailable = totalPrice > 250000;

    // default true jika memenuhi, pembeli juga nonaktifin
    const deliveryStatus =
      deliveryAvailable !== undefined
        ? deliveryCriteria
        : deliveryAvailable
        ? true
        : false;

    const order = await prisma.order.create({
      data: {
        total_menu: totalMenu,
        total_price: totalPrice,
        status: "Pending",
        status_pickup: "Cooking",
        delivery_status: deliveryStatus,
        buyerId: buyer.id,
        orderItem: {
          create: menuItem.map((item: MenuItem) => ({
            menuVariantId: item.menuVariantId,
            quantity: item.quantity,
            subtotalPerMenu: item.subtotalPerMenu,
            pricePerMenu: item.pricePerMenu,
          })),
        },
      },
    });

    const transaction = await prisma.transaction.create({
      data: {
        total_price: totalPrice,
        status_payment: "Pending",
        vendorId: selectedVendorId,
        orderId: order.id,
      },
    });

    const transactionDetails = {
      transaction_details: {
        order_id: order.id,
        gross_amount: totalPrice,
      },
      customer_details: { first_name: buyer.first_name || "Guest" },
    };

    const midtransTransaction = await snap.createTransaction(
      transactionDetails
    );

    response.send({
      message: "Order created successfully!",
      order,
      transaction,
      midtransTransaction,
    });
  } catch (error) {
    next(error);
  }
};

const updateOrderStatus: RequestHandler = async (request, response, next) => {
  try {
    const { id } = request.params;
    const { status } = request.body;
    const vendorId = request.body.payload.id;

    if (!id) {
      throw new AppError("Order Id is required", STATUS.BAD_REQUEST);
    }

    if (!status) {
      throw new AppError("Status is required", STATUS.BAD_REQUEST);
    }

    const order = await prisma.order.findUnique({
      where: {
        id: id,
      },
      include: {
        orderItem: {
          include: {
            menuVariant: {
              include: {
                menu: true,
              },
            },
          },
        },
        transaction: true,
      },
    });

    if (!order) {
      throw new AppError("Order not found", STATUS.NOT_FOUND);
    }

    switch (status) {
      case "Accepted":
        await prisma.order.update({
          where: {
            id: id,
          },
          data: {
            status: "Accepted",
          },
        });
        break;

      case "Declined":
        await prisma.order.update({
          where: {
            id: id,
          },
          data: {
            status: "Declined",
          },
        });

        await prisma.transaction.update({
          where: {
            id,
          },
          data: {
            status_payment: "Refund_Pending",
          },
        });
        break;

      default:
        throw new AppError("Invalid status provided", STATUS.BAD_REQUEST);
    }

    response.send({
      message: "Order status updated successfully!",
    });
  } catch (error) {
    next(error);
  }
};

const updateStatusPickup: RequestHandler = async (request, response, next) => {
  try {
    const { id } = request.params;
    const { status_pickup } = request.body;

    if (!id) {
      throw new AppError("Order Id is required", STATUS.BAD_REQUEST);
    }

    if (!status_pickup) {
      throw new AppError("status_pickup is required", STATUS.BAD_REQUEST);
    }

    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        orderItem: {
          include: {
            menuVariant: {
              include: {
                menu: true,
              },
            },
          },
        },
        transaction: true,
      },
    });

    if (!order) {
      throw new AppError("Order not found", STATUS.NOT_FOUND);
    }

    if (order.status === "Pending") {
      throw new AppError(
        "Order must be accepted before updating status_pickup",
        STATUS.BAD_REQUEST
      );
    }

    let newStatusPickup: Status_Pickup;

    switch (order.status_pickup) {
      case "Cooking":
        if (status_pickup === "Ready") {
          newStatusPickup = "Ready";
        } else {
          throw new AppError(
            "Invalid status change. You must go from Cooking to Ready first.",
            STATUS.BAD_REQUEST
          );
        }
        break;

      case "Ready":
        if (status_pickup === "Picked_Up") {
          newStatusPickup = "Picked_Up";
        } else {
          throw new AppError(
            "Invalid status change. You must go from Ready to Picked_Up.",
            STATUS.BAD_REQUEST
          );
        }
        break;

      default:
        throw new AppError(
          "Invalid status_pickup transition",
          STATUS.BAD_REQUEST
        );
    }

    // Update status_pickup jika valid
    await prisma.order.update({
      where: { id },
      data: { status_pickup: newStatusPickup },
    });

    response.send({
      message: "Order pickup status updated successfully!",
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getOrderBuyer,
  createOrder,
  updateOrderStatus,
  getOrderVendor,
  updateStatusPickup,
  getOrderBuyerById,
};
