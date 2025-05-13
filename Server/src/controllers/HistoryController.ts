import { RequestHandler } from "express";
import { STATUS } from "../utils/http/statusCodes";
import { AppError } from "../utils/http/AppError";
import { prisma } from "../config/config";

const getAllTransactionHistory: RequestHandler = async (
  request,
  response,
  next
) => {
  try {
    const requesterId = request.body.payload.id;

    if (!requesterId) {
      throw new AppError("Unauthorized", STATUS.UNAUTHORIZED);
    }

    const user = await prisma.user.findUnique({
      where: {
        id: requesterId,
      },
    });

    if (!user || user.role !== "Admin") {
      throw new AppError(
        "Only Admins can access all transaction history",
        STATUS.FORBIDDEN
      );
    }

    const transactions = await prisma.transaction.findMany({
      select: {
        id: true,
        status_payment: true,
        createAt: true,
        order: {
          select: {
            total_menu: true,
            total_price: true,
            status: true,
            delivery_status: true,
            status_pickup: true,
            buyerId: true,
            buyer: {
              select: {
                first_name: true,
                last_name: true,
              },
            },
            orderItem: {
              select: {
                quantity: true,
                subtotalPerMenu: true,
                pricePerMenu: true,
                menuVariant: {
                  select: {
                    name: true,
                    price: true,
                    stock: true,
                    menu: {
                      select: {
                        name: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        vendor: {
          select: {
            name: true,
          },
        },
      },
    });

    response.send({
      message: "All transaction history retrieved successfully",
      data: transactions,
    });
  } catch (error) {
    next(error);
  }
};

const getVendorTransactionHistory: RequestHandler = async (
  request,
  response,
  next
) => {
  try {
    const requesterId = request.body.payload.id;

    if (!requesterId) {
      throw new AppError("Unauthorized", STATUS.UNAUTHORIZED);
    }

    const vendor = await prisma.vendor.findUnique({
      where: {
        userId: requesterId,
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (!vendor) {
      throw new AppError(
        "You are not authorized to access this vendor's history",
        STATUS.FORBIDDEN
      );
    }

    const transactions = await prisma.transaction.findMany({
      where: {
        vendorId: vendor.id,
      },
      select: {
        id: true,
        status_payment: true,
        createAt: true,
        order: {
          select: {
            total_menu: true,
            total_price: true,
            status: true,
            delivery_status: true,
            status_pickup: true,
            buyerId: true,
            buyer: {
              select: {
                first_name: true,
                last_name: true,
              },
            },
            orderItem: {
              select: {
                quantity: true,
                subtotalPerMenu: true,
                pricePerMenu: true,
                menuVariant: {
                  select: {
                    name: true,
                    price: true,
                    stock: true,
                    menu: {
                      select: {
                        name: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        vendor: {
          select: {
            name: true,
          },
        },
        review: {
          select: {
            rating: true,
            description: true,
          },
        },
      },
    });

    response.send({
      message: `Transaction history for vendor ${vendor.name} retrieved successfully`,
      data: transactions,
    });
  } catch (error) {
    next(error);
  }
};

const getBuyerTransactionHistory: RequestHandler = async (
  request,
  response,
  next
) => {
  try {
    const requesterId = request.body.payload.id;

    if (!requesterId) {
      throw new AppError("Unauthorized", STATUS.UNAUTHORIZED);
    }

    const buyer = await prisma.buyer.findUnique({
      where: {
        userId: requesterId,
      },
      select: {
        id: true,
      },
    });

    if (!buyer) {
      throw new AppError(
        "You are not authorized to access this buyer's history",
        STATUS.FORBIDDEN
      );
    }

    const transactions = await prisma.transaction.findMany({
      where: {
        order: {
          buyerId: buyer.id,
        },
      },
      select: {
        id: true,
        status_payment: true,
        createAt: true,
        order: {
          select: {
            total_menu: true,
            total_price: true,
            status: true,
            delivery_status: true,
            status_pickup: true,
            orderItem: {
              select: {
                quantity: true,
                subtotalPerMenu: true,
                pricePerMenu: true,
                menuVariant: {
                  select: {
                    name: true,
                    price: true,
                    stock: true,
                    menu: {
                      select: {
                        name: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        vendor: {
          select: {
            name: true,
          },
        },
        review: {
          select: {
            rating: true,
            description: true,
          },
        },
      },
    });

    response.send({
      message: `Transaction history for buyer retrieved successfully`,
      data: transactions,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getAllTransactionHistory,
  getVendorTransactionHistory,
  getBuyerTransactionHistory,
};
