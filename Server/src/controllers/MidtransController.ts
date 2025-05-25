import { RequestHandler, response } from "express";
import { prisma } from "../config/config";

// const midtransClient = require("midtrans-client");
import midtransClient from "midtrans-client";
import axios from "axios";

const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY || "",
  clientKey: process.env.MIDTRANS_CLIENT_KEY || "",
});

async function checkPaymentStatus(order_id: string) {
  try {
    const response = await axios.get(
      `https://api.sandbox.midtrans.com/v2/${order_id}/status`,
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            process.env.MIDTRANS_SERVER_KEY || ""
          ).toString("base64")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error checking payment status", error);
    throw new Error("Error checking payment status");
  }
}

const midtransUpdateStatusOrder: RequestHandler = async (req, res, next) => {
  try {
    const { order_id } = req.body;
    // Cek status pembayaran
    const paymentStatus = await checkPaymentStatus(order_id);
    const transaction_status = paymentStatus.transaction_status;

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

    res.status(200).send({ message: "Notification received" });
  } catch (error) {
    // console.error(error);
    next(error);
  }
};

export default { midtransUpdateStatusOrder };
