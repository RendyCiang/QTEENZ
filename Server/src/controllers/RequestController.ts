import { request, RequestHandler } from "express";
import { prisma } from "../config/config";
import bcrypt from "bcryptjs";
import { STATUS } from "../utils/http/statusCodes";
import { AppError } from "../utils/http/AppError";

const getRequest: RequestHandler = async (request, response, next) => {
  try {
    const requestData = await prisma.request.findMany();
    const requester = request.body.payload.id;

    const user = await prisma.user.findUnique({
      where: {
        id: requester,
      },
    });

    if (!user || user.role !== "Admin") {
      throw new AppError("Unauthorized", STATUS.UNAUTHORIZED);
    }

    response.send({
      message: "All requests retrieved successfully!",
      data: requestData,
    });
  } catch (error) {
    next(error);
  }
};

const getRequestById: RequestHandler = async (request, response, next) => {
  try {
    const { id } = request.params;

    if (!id) {
      throw new Error("Request ID is required");
    }

    const requester = request.body.payload.id;

    const user = await prisma.user.findUnique({
      where: {
        id: requester,
      },
    });

    if (!user || user.role !== "Admin") {
      throw new AppError("Unauthorized", STATUS.UNAUTHORIZED);
    }

    const requestData = await prisma.request.findUnique({
      where: {
        id,
      },
    });

    if (!requestData) {
      throw new Error("Request not found");
    }

    response.send({
      message: "Request found successfully!",
      data: requestData,
    });
  } catch (error) {
    next(error);
  }
};

const updateRequest: RequestHandler = async (request, response, next) => {
  try {
    const { id } = request.params;
    const { status, message } = request.body;

    if (!id) {
      throw new Error("Request ID is required");
    }

    if (!status) {
      throw new Error("Status is required");
    }

    if (status === "Declined" && !message) {
      throw new Error("Message is required");
    }

    const requester = request.body.payload.id;

    const user = await prisma.user.findUnique({
      where: {
        id: requester,
      },
    });

    if (!user || user.role !== "Admin") {
      throw new AppError("Unauthorized", STATUS.UNAUTHORIZED);
    }

    const updateRequest = await prisma.request.update({
      where: {
        id,
      },
      data: {
        status,
        message,
      },
    });

    if (status === "Accepted") {
      const newSeller = await prisma.user.create({
        data: {
          email: updateRequest.email || null,
          phone: updateRequest.phone,
          password: await bcrypt.hash("password", 10),
          role: "Seller",
          vendor: {
            create: {
              name: updateRequest.vendor_name,
              location: updateRequest.location,
              open_hour: updateRequest.open_hour,
              close_hour: updateRequest.close_hour,
              status: "Close",
              bank_account: updateRequest.bank_account,
              rating: 0,
            },
          },
        },
      });
    }
    response.send({
      message: "Request updated successfully!",
      data: updateRequest,
    });
  } catch (error) {
    next(error);
  }
};

export default { getRequest, getRequestById, updateRequest };
