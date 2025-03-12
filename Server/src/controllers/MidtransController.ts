import { RequestHandler, response } from "express";
import { prisma } from "../config/config";

const midtransClient = require("midtrans-client");

const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.SECRET,
  clientKey: process.env.NEXT_PUBLIC_CLIENT,
});

const midtransUpdateStatusOrder: RequestHandler = async (req, res, next) => {
  try {
    const { order_id, transaction_status } = req.body;

    if (
      transaction_status === "settlement" ||
      transaction_status === "capture"
    ) {
      // Midtrans === Sukses, Transaksi Sukses
      await prisma.transaction.update({
        where: {
          orderId: order_id,
        },
        data: {
          status_payment: "Success",
        },
      });
    } else if (
      transaction_status === "cancel" ||
      transaction_status === "deny" ||
      transaction_status === "expire"
    ) {
      // Midtrans === Gagal, Vendor auto declined, transaksi auto gagal
      await prisma.order.update({
        where: {
          id: order_id,
        },
        data: {
          status: "Declined",
        },
      });

      await prisma.transaction.update({
        where: {
          orderId: order_id,
        },
        data: {
          status_payment: "Failed",
        },
      });
    }

    response.send({
      message: "Order status updated successfully!",
    });
  } catch (error) {
    next(error);
  }
};

export default { midtransUpdateStatusOrder };
