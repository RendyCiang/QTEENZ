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

const updateVendor: RequestHandler = async (request, response, next) => {
  try {
    const { id } = request.params;
    const { name, location, open_hour, close_hour, status, delivery_status } =
      request.body;

    if (!id) {
      throw new AppError("Vendor ID is required", STATUS.BAD_REQUEST);
    }

    const requesterId = request.body.payload.id;
    const requester = await prisma.user.findUnique({
      where: {
        id: requesterId,
      },
    });

    if (!requester) {
      throw new AppError("Unauthorized", STATUS.UNAUTHORIZED);
    }

    const existingVendor = await prisma.vendor.findUnique({
      where: {
        id,
      },
    });

    if (!existingVendor) {
      throw new AppError("Vendor not found", STATUS.NOT_FOUND);
    }

    if (requester.role !== "Admin" && existingVendor.userId !== requesterId) {
      throw new AppError(
        "Unauthorized to edit this vendor",
        STATUS.UNAUTHORIZED
      );
    }

    const vendor = await prisma.vendor.update({
      where: { id },
      data: {
        name: name || existingVendor.name,
        location: location || existingVendor.location,
        open_hour: open_hour || existingVendor.open_hour,
        close_hour: close_hour || existingVendor.close_hour,
        status: status || existingVendor.status,
        delivery_status: delivery_status ?? existingVendor.delivery_status,
      },
    });

    response.send({
      message: "Vendor updated successfully!",
      data: vendor,
    });
  } catch (error) {
    next(error);
  }
};

const deleteVendor: RequestHandler = async (request, response, next) => {
  try {
    const { id } = request.params;

    const requesterId = request.body.payload.id;

    const requester = await prisma.user.findUnique({
      where: {
        id: requesterId,
      },
    });

    if (!requester) {
      throw new AppError("Unauthorized", STATUS.UNAUTHORIZED);
    }

    if (requester.role !== "Admin") {
      throw new AppError("Unauthorized", STATUS.UNAUTHORIZED);
    }

    if (!id) {
      throw new AppError("Vendor ID is required", STATUS.BAD_REQUEST);
    }

    const vendor = await prisma.vendor.delete({
      where: {
        id,
      },
    });

    response.send({
      message: "Vendor deleted successfully!",
      data: vendor,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getVendor,
  getVendorByid,
  updateVendor,
  deleteVendor,
};
