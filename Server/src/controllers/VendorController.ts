import { RequestHandler } from "express";
import { STATUS } from "../utils/http/statusCodes";
import { AppError } from "../utils/http/AppError";
import { prisma } from "../config/config";
import cron from "node-cron";

const getVendor: RequestHandler = async (request, response, next) => {
  try {
    const vendor = await prisma.vendor.findMany({
      select: {
        id: true,
        name: true,
        vendor_name: true,
        location: true,
        open_hour: true,
        close_hour: true,
        status: true,
        rating: true,
        delivery_status: true,
        user: {
          select: {
            id: true,
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
        userId: id,
      },
      select: {
        name: true,
        vendor_name: true,
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
    const {
      name,
      vendor_name,
      location,
      open_hour,
      close_hour,
      status,
      delivery_status,
      bank_account,
      bank_type,
      photo,
    } = request.body;

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
      include: {
        user: true,
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
        vendor_name: vendor_name || existingVendor.vendor_name,
        bank_account: bank_account || existingVendor.bank_account,
        bank_type: bank_type || existingVendor.bank_type,
      },
    });

    if (photo && photo !== existingVendor.user.photo) {
      await prisma.user.update({
        where: {
          id: existingVendor.userId,
        },
        data: {
          photo,
        },
      });
    }

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

function getStatus(open: string, close: string): "Open" | "Close" {
  const now = new Date();
  const [openH, openM = 0] = open.split(":").map(Number);
  const [closeH, closeM = 0] = close.split(":").map(Number);

  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const openMinutes = openH * 60 + openM;
  const closeMinutes = closeH * 60 + closeM;

  if (closeMinutes < openMinutes) {
    return nowMinutes >= openMinutes || nowMinutes < closeMinutes
      ? "Open"
      : "Close";
  }

  return nowMinutes >= openMinutes && nowMinutes < closeMinutes
    ? "Open"
    : "Close";
}

const updateVendorStatus = async () => {
  try {
    const vendors = await prisma.vendor.findMany({
      select: {
        id: true,
        open_hour: true,
        close_hour: true,
      },
    });

    for (const vendor of vendors) {
      const status = getStatus(vendor.open_hour, vendor.close_hour);

      await prisma.vendor.update({
        where: {
          id: vendor.id,
        },
        data: {
          status,
        },
      });
    }

    console.log(`[${new Date().toLocaleString()}] Vendor statuses updated.`);
  } catch (error) {
    console.error("Error updating vendor statuses:", error);
  }
};

// Cek Setiap 5 menit
cron.schedule("*/5 * * * *", async () => {
  await updateVendorStatus();
});

export default {
  getVendor,
  getVendorByid,
  updateVendor,
  deleteVendor,
  updateVendorStatus,
};
