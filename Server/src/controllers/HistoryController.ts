import e, { RequestHandler } from "express";
import { STATUS } from "../utils/http/statusCodes";
import { AppError } from "../utils/http/AppError";
import { prisma } from "../config/config";
import { Status_Pickup } from "@prisma/client";

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
                        photo: true,
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
            applicationReview: true,
          },
        },
      },
    });

    const earningsPerVendor: { vendor: string; totalEarnings: number }[] = [];
    let totalRating = 0;
    let ratingCount = 0;
    const buyersWithReview: string[] = [];
    const buyersWithoutReview: string[] = [];

    transactions.forEach((trx) => {
      const order = trx.order;
      const vendorName = trx.vendor?.name || "Unknown Vendor";

      if (trx.review?.rating) {
        totalRating += trx.review.rating;
        ratingCount += 1;
        if (!buyersWithReview.includes(trx.order.buyerId)) {
          buyersWithReview.push(trx.order.buyerId);
        }
      } else {
        if (
          !buyersWithReview.includes(trx.order.buyerId) &&
          !buyersWithoutReview.includes(trx.order.buyerId)
        ) {
          buyersWithoutReview.push(trx.order.buyerId);
        }
      }

      const isValid =
        trx.status_payment === "Success" &&
        order?.status_pickup === Status_Pickup.Picked_Up &&
        order?.status === "Accepted" &&
        typeof order.total_price === "number";

      if (isValid) {
        const existing = earningsPerVendor.find(
          (entry) => entry.vendor === vendorName
        );

        if (existing) {
          existing.totalEarnings += order.total_price!;
        } else {
          earningsPerVendor.push({
            vendor: vendorName,
            totalEarnings: order.total_price!,
          });
        }
      }
    });

    const averageRating =
      ratingCount > 0 ? Number((totalRating / ratingCount).toFixed(1)) : null;

    const totalReviews = buyersWithReview.length;
    const totalNotReviews = buyersWithoutReview.length;

    // console.log("Buyers reviewed:");
    // console.log(buyersWithReview);

    // console.log("Buyers not reviewed:");
    // console.log(buyersWithoutReview);

    const totalUserReviews = totalReviews + totalNotReviews;

    response.send({
      message: "All transaction history retrieved successfully",
      data: transactions,
      totalEarnings: earningsPerVendor,
      averageRating,
      totalReviews,
      totalNotReviews,
      totalUserReviews,
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
                        photo: true,
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

    const totalEarnings = transactions.reduce((total, trx) => {
      const order = trx.order;
      if (
        trx.status_payment === "Success" &&
        order?.status_pickup === Status_Pickup.Picked_Up &&
        order?.status === "Accepted" &&
        order?.total_price
      ) {
        return total + order.total_price;
      }
      return total;
    }, 0);

    response.send({
      message: `Transaction history for vendor ${vendor.name} retrieved successfully`,
      totalEarnings,
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
            id: true,
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
                    id: true,
                    name: true,
                    price: true,
                    stock: true,
                    menu: {
                      select: {
                        id: true,
                        name: true,
                        photo: true,
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
