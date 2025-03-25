import { request, RequestHandler, response } from "express";
import { STATUS } from "../utils/http/statusCodes";
import { AppError } from "../utils/http/AppError";
import { prisma } from "../config/config";

const getVendor: RequestHandler = async (request, response, next) => {
  try {
    const vendor = await prisma.vendor.findMany({
      select: {
        id: true,
        name: true,
        location: true,
        open_hour: true,
        close_hour: true,
        status: true,
        rating: true,
        delivery_status: true,
        user: {
          select: {
            photo: true,
          },
        },
      },
    });

    response.send({
      message: "All vendors retrieved successfully!",
      data: vendor,
    });
  } catch (error) {
    next(error);
  }
};

const getVendorByid: RequestHandler = async (request, response, next) => {
  try {
    const { id } = request.params;

    if (!id) {
      throw new AppError("Vendor ID is required", STATUS.BAD_REQUEST);
    }

    const vendor = await prisma.vendor.findUnique({
      where: {
        id,
      },
      select: {
        name: true,
        location: true,
        open_hour: true,
        close_hour: true,
        status: true,
        rating: true,
        delivery_status: true,
        user: {
          select: {
            photo: true,
          },
        },
      },
    });

    if (!vendor) {
      throw new AppError("Vendor not found", STATUS.NOT_FOUND);
    }

    response.send({
      message: "Vendor retrieved successfully!",
      data: vendor,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getVendor,
  getVendorByid,
};
