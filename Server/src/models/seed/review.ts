import { Status_payment } from "@prisma/client";
import { prisma } from "../../config/config";
import { application } from "express";

export async function seedReviews() {
  try {
    const existingReviews = await prisma.review.findMany({
      select: {
        id: true,
      },
    });

    if (existingReviews.length > 0) {
      return;
    }

    const buyers = await prisma.buyer.findMany({
      select: {
        id: true,
      },
    });

    const vendors = await prisma.vendor.findMany({
      select: {
        id: true,
      },
    });

    const orders = await prisma.order.findMany({
      select: {
        id: true,
        buyerId: true,
        total_price: true,
      },
    });

    const transactionData = [
      {
        orderId: orders[0].id,
        vendorId: vendors[0].id,
        status_payment: Status_payment.Success,
        total_price: orders[0].total_price,
      },
      {
        orderId: orders[1].id,
        vendorId: vendors[1].id,
        status_payment: Status_payment.Success,
        total_price: orders[1].total_price,
      },
    ];

    await prisma.order.updateMany({
      where: {
        id: { in: [orders[0].id, orders[1].id] },
      },
      data: {
        status_pickup: "Picked_Up",
      },
    });

    for (const transaction of transactionData) {
      await prisma.transaction.create({
        data: transaction,
      });
    }

    const transactions = await prisma.transaction.findMany({
      where: {
        orderId: {
          in: [orders[0].id, orders[1].id],
        },
        status_payment: "Success",
      },
      select: {
        id: true,
        vendorId: true,
      },
    });

    if (transactions.length === 0) {
      throw new Error("No valid transactions found for seeding reviews.");
    }

    const reviewData = [
      {
        transactionId: transactions[0].id,
        rating: 4,
        description: "Mantap Gan, Enak!",
        applicationReview: "bagus Gan COCOK Di launchin ini App!",
      },
      {
        transactionId: transactions[1].id,
        rating: 5,
        description: "Perfecto!",
        applicationReview: "Infokan investor untuk investasi di aplikasi ini!",
      },
    ];

    for (const review of reviewData) {
      await prisma.review.create({
        data: review,
      });

      const transaction = transactions.find(
        (t) => t.id === review.transactionId
      );
      if (transaction) {
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
          where: {
            id: vendorId,
          },
          data: {
            rating: averageRating,
          },
        });
      }
    }
  } catch (error) {
    console.error("Error seeding reviews:", error);
  } finally {
    await prisma.$disconnect();
  }
}
