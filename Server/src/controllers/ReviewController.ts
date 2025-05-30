import { RequestHandler } from "express";
import { STATUS } from "../utils/http/statusCodes";
import { AppError } from "../utils/http/AppError";
import { prisma } from "../config/config";

const createReview: RequestHandler = async (request, response, next) => {
  try {
    // Order ID diambil dari parameter URL
    const { orderId } = request.params;

    // Ambil dari body request
    const { rating, description, applicationReview } = request.body;

    // Ambil token JWT
    const requester = request.body.payload.id;

    if (!requester) {
      throw new AppError("Unauthorized", STATUS.UNAUTHORIZED);
    }

    // Cek JWT token itu user yang mana
    const buyer = await prisma.buyer.findUnique({
      where: {
        userId: requester,
      },
    });

    if (!buyer) {
      throw new AppError("Buyer Not Found", STATUS.UNAUTHORIZED);
    }

    if (!rating || !description) {
      throw new AppError(
        "Rating and description are required",
        STATUS.BAD_REQUEST
      );
    }

    const transaction = await prisma.transaction.findUnique({
      where: { orderId },
      // Include data order buat cek status pick-up
      include: {
        order: true,
      },
    });

    if (!transaction) {
      throw new AppError("Transaction not found", STATUS.NOT_FOUND);
    }

    if (transaction.order.buyerId !== buyer.id) {
      throw new AppError(
        "You are not authorized to review this order",
        STATUS.UNAUTHORIZED
      );
    }

    if (transaction.status_payment !== "Success") {
      throw new AppError(
        "You can only review orders that have been paid",
        STATUS.BAD_REQUEST
      );
    }

    if (transaction.order.status_pickup !== "Picked_Up") {
      throw new AppError(
        "You can only review orders that have been picked up",
        STATUS.BAD_REQUEST
      );
    }

    // Ngambil buyerId dari user yang login
    const existingReview = await prisma.review.findUnique({
      where: {
        transactionId: transaction.id,
      },
    });

    if (existingReview) {
      throw new AppError(
        "You have already reviewed this order",
        STATUS.BAD_REQUEST
      );
    }

    const review = await prisma.review.create({
      data: {
        rating,
        description,
        transactionId: transaction.id,
        applicationReview: applicationReview || null,
      },
    });

    const vendorId = transaction.vendorId;
    const vendorTransactions = await prisma.transaction.findMany({
      where: {
        vendorId,
        status_payment: "Success",
      },
      include: {
        review: true,
      },
    });

    const totalRating = vendorTransactions.reduce(
      (sum, tx) => sum + (tx.review?.rating || 0),
      0
    );
    const averageRating = vendorTransactions.length
      ? totalRating / vendorTransactions.length
      : 0;

    await prisma.vendor.update({
      where: { id: vendorId },
      data: { rating: averageRating },
    });

    response.send({
      message: "Review created successfully!",
      data: review,
    });
  } catch (error) {
    next(error);
  }
};

const getVendorReviewById: RequestHandler = async (request, response, next) => {
  try {
    const { vendorId } = request.params;

    if (!vendorId) {
      throw new AppError("Vendor ID is required", STATUS.BAD_REQUEST);
    }

    const reviews = await prisma.review.findMany({
      where: {
        transaction: {
          vendorId: vendorId,
        },
      },
      include: {
        transaction: {
          include: {
            order: {
              include: {
                buyer: {
                  select: {
                    first_name: true,
                  },
                },
                orderItem: {
                  include: {
                    menuVariant: {
                      include: {
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
          },
        },
      },
    });

    const formattedReviews = reviews.map((review) => ({
      rating: review.rating,
      description: review.description,
      buyer: {
        firstName: review.transaction.order.buyer.first_name,
      },
      items: review.transaction.order.orderItem.map((orderItem) => ({
        menu: orderItem.menuVariant.menu.name,
        variant: orderItem.menuVariant.name,
      })),
    }));

    response.send({
      message: "Success fetching reviews for vendor",
      data: formattedReviews,
    });
  } catch (error) {
    next(error);
  }
};

const deleteReview: RequestHandler = async (request, response, next) => {
  try {
    const { reviewId } = request.params;
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
      throw new AppError("Only Admins can delete reviews", STATUS.FORBIDDEN);
    }

    const review = await prisma.review.findUnique({
      where: {
        id: reviewId,
      },
      include: {
        transaction: true,
      },
    });

    if (!review) {
      throw new AppError("Review not found", STATUS.NOT_FOUND);
    }

    const vendorId = review.transaction.vendorId;

    await prisma.review.delete({
      where: {
        id: reviewId,
      },
    });

    // Recalculate vendor rating
    const vendorTransactions = await prisma.transaction.findMany({
      where: {
        vendorId,
        status_payment: "Success",
      },
      include: {
        review: true,
      },
    });

    const totalRating = vendorTransactions.reduce(
      (sum, tx) => sum + (tx.review?.rating || 0),
      0
    );
    const ratedCount = vendorTransactions.filter((tx) => tx.review).length;
    const averageRating = ratedCount > 0 ? totalRating / ratedCount : 0;

    await prisma.vendor.update({
      where: { id: vendorId },
      data: { rating: averageRating },
    });

    response.send({
      message: "Review deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

const getAllReviews: RequestHandler = async (request, response, next) => {
  try {
    const reviews = await prisma.review.findMany({
      select: {
        rating: true,
        description: true,
        createAt: true,
        transaction: {
          include: {
            vendor: {
              select: {
                name: true,
              },
            },
            order: {
              include: {
                orderItem: {
                  include: {
                    menuVariant: {
                      include: {
                        menu: {
                          select: {
                            name: true,
                          },
                        },
                      },
                    },
                  },
                },
                buyer: {
                  select: {
                    first_name: true,
                    last_name: true,
                    user: {
                      select: {
                        photo: true,
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

    const formattedReviews = reviews.map((review) => ({
      vendor: review.transaction.vendor.name,
      rating: review.rating,
      description: review.description,
      createAt: review.createAt,
      buyer: {
        buyerName: `${review.transaction.order.buyer.first_name} ${review.transaction.order.buyer.last_name}`,
        photo: review.transaction.order.buyer.user.photo,
      },
      items: review.transaction.order.orderItem.map((orderItem) => ({
        menu: orderItem.menuVariant.menu.name,
        variant: orderItem.menuVariant.name,
      })),
    }));

    response.send({
      message: "All reviews retrieved successfully",
      data: formattedReviews,
    });
  } catch (error) {
    next(error);
  }
};

const getReviewAdmin: RequestHandler = async (request, response, next) => {
  try {
    const requesterId = request.body.payload.id;

    if (!requesterId) {
      throw new AppError("Unauthorized", STATUS.UNAUTHORIZED);
    }

    const user = await prisma.user.findUnique({
      where: { id: requesterId },
    });

    if (!user || user.role !== "Admin") {
      throw new AppError(
        "Only Admins can access all reviews",
        STATUS.FORBIDDEN
      );
    }

    const reviews = await prisma.review.findMany({
      include: {
        transaction: {
          include: {
            order: {
              include: {
                buyer: {
                  select: {
                    id: true,
                    first_name: true,
                    last_name: true,
                    userId: true,
                  },
                },
                orderItem: {
                  include: {
                    menuVariant: {
                      include: {
                        menu: {
                          select: {
                            id: true,
                            name: true,
                            vendor: {
                              select: {
                                id: true,
                                name: true,
                              },
                            },
                          },
                        },
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

    const formattedReviews = reviews.map((review) => ({
      id: review.id,
      rating: review.rating,
      description: review.description,
      applicationReview: review.applicationReview,
      createdAt: review.createAt,
      transactionId: review.transactionId,
      vendor: review.transaction.order.orderItem[0]?.menuVariant.menu.vendor,
      buyer: review.transaction.order.buyer,
      items: review.transaction.order.orderItem.map((orderItem) => ({
        menu: orderItem.menuVariant.menu.name,
        variant: orderItem.menuVariant.name,
      })),
    }));

    response.send({
      message: "All reviews retrieved for admin successfully",
      data: formattedReviews,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  createReview,
  getVendorReviewById,
  deleteReview,
  getAllReviews,
  getReviewAdmin,
};
