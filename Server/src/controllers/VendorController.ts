import { request, RequestHandler, response } from "express";
import { STATUS } from "../utils/http/statusCodes";
import { AppError } from "../utils/http/AppError";
import { prisma } from "../config/config";

const createVendor: RequestHandler = async (request, response, next) => {
  try {
    const { code } = request.body;

    if (!code) {
      throw new AppError("Vendor code is required", STATUS.BAD_REQUEST);
    }

    const existingVendor = await prisma.vendorCode.findUnique({
      where: {
        code,
      },
    });

    if (existingVendor) {
      throw new AppError("Vendor code already registered", STATUS.BAD_REQUEST);
    }

    // const vendorCount = await prisma.vendorCode.count();
    // const id = "VEN" + (vendorCount + 1).toString();
    const vendorCode = await prisma.vendorCode.create({
      data: {
        code,
        isUsed: false,
      },
    });

    response.send({
      message: "Vendor created successfully!",
      data: vendorCode,
    });
  } catch (error) {
    next(error);
  }
};

const getVendor: RequestHandler = async (request, response, next) => {
  try {
    const dataVendor = await prisma.vendorCode.findMany();
    response.send({
      message: "Registered vendors retrieved successfully!",
      data: dataVendor,
    });
  } catch (error) {
    next(error);
  }
};

const editVendor: RequestHandler = async (request, response, next) => {
  try {
    const { id } = request.params;
    if (!id) {
      throw new AppError("Vendor ID is required", STATUS.BAD_REQUEST);
    }

    const { code } = request.body;

    if (!code) {
      throw new AppError("Code is required", STATUS.BAD_REQUEST);
    }

    const existingCode = await prisma.vendorCode.findUnique({
      where: {
        code,
      },
    });

    if (existingCode) {
      throw new AppError("Code already registered", STATUS.BAD_REQUEST);
    }
    await prisma.vendorCode.update({
      where: {
        id,
      },
      data: {
        code,
      },
    });
  } catch (error) {
    next(error);
  }
};

const deleteVendor: RequestHandler = async (request, response, next) => {
  try {
    const { id } = request.params;

    const existingVendor = await prisma.vendorCode.findUnique({
      where: {
        id,
      },
    });

    if (!existingVendor) {
      throw new AppError("Vendor Id not found", STATUS.BAD_REQUEST);
    }

    await prisma.vendorCode.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    next(error);
  }
};

export default { createVendor, getVendor, editVendor, deleteVendor };
