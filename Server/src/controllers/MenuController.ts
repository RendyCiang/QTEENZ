import { RequestHandler, response } from "express";
import { prisma } from "../config/config";
import { STATUS } from "../utils/http/statusCodes";
import { AppError } from "../utils/http/AppError";
import { menuValidation } from "../schema/menuSchema";

const getMenu: RequestHandler = async (request, response, next) => {
  try {
    const menuData = await prisma.menu.findMany();
    response.send({
      message: "Menu retrieved successfully!",
      data: menuData,
    });
  } catch (error) {
    next(error);
  }
};

const createMenu: RequestHandler = async (request, response, next) => {
  try {
    const validatedData = menuValidation.parse(request.body);
    const { name, price, description, stock, categoryId, photo } =
      validatedData;
    const requesterId = request.body.payload.id;

    const requester = await prisma.user.findUnique({
      where: {
        id: requesterId,
      },
    });

    if (
      !requester ||
      (requester.role !== "Seller" && requester.role !== "Admin")
    ) {
      throw new AppError("Unauthorized", STATUS.UNAUTHORIZED);
    }

    let vendorId = request.body.vendorId;

    if (requester.role === "Admin") {
      if (!vendorId) {
        throw new AppError(
          "Vendor ID is required for Admin",
          STATUS.BAD_REQUEST
        );
      }
      const vendor = await prisma.vendor.findUnique({
        where: {
          id: vendorId,
        },
      });

      if (!vendor) {
        throw new AppError("Vendor not found", STATUS.NOT_FOUND);
      }
    } else {
      const vendor = await prisma.vendor.findUnique({
        where: {
          userId: requester.id,
        },
      });

      if (!vendor) {
        throw new AppError("Vendor not found", STATUS.NOT_FOUND);
      }

      vendorId = vendor.id;
    }

    const newMenu = await prisma.menu.create({
      data: {
        name,
        price,
        description,
        stock,
        photo,
        categoryId,
        vendorId,
      },
    });

    response.send({ message: "Menu created successfully!", data: newMenu });
  } catch (error) {
    next(error);
  }
};

const editMenu: RequestHandler = async (request, response, next) => {
  try {
    const { id } = request.params;
    const { name, price, description, stock, categoryId, photo } = request.body;

    if (!id) {
      throw new AppError("Menu ID is required", STATUS.BAD_REQUEST);
    }

    const requesterId = request.body.payload.id;
    const requester = await prisma.user.findUnique({
      where: { id: requesterId },
    });

    if (
      !requester ||
      (requester.role !== "Seller" && requester.role !== "Admin")
    ) {
      throw new AppError("Unauthorized", STATUS.UNAUTHORIZED);
    }

    const existingMenu = await prisma.menu.findUnique({
      where: {
        id,
      },
    });

    if (!existingMenu) {
      throw new AppError("Menu not found", STATUS.NOT_FOUND);
    }

    let vendorId = existingMenu.vendorId;

    if (requester.role === "Seller") {
      const vendor = await prisma.vendor.findUnique({
        where: { userId: requester.id },
      });

      if (!vendor || vendor.id !== vendorId) {
        throw new AppError("Unauthorized", STATUS.FORBIDDEN);
      }
    }

    if (price !== undefined && price <= 0) {
      throw new AppError("Price must be greater than 0", STATUS.BAD_REQUEST);
    }

    const updatedMenu = await prisma.menu.update({
      where: { id },
      data: {
        name: name || existingMenu.name,
        price: price !== undefined ? price : existingMenu.price,
        description: description || existingMenu.description,
        stock: stock || existingMenu.stock,
        photo: photo || existingMenu.photo,
        categoryId: categoryId || existingMenu.categoryId,
        vendorId,
      },
    });

    response.send({
      message: "Menu updated successfully!",
      data: updatedMenu,
    });
  } catch (error) {
    next(error);
  }
};

const deleteMenu: RequestHandler = async (request, response, next) => {
  try {
    const { id } = request.params;

    if (!id) {
      throw new AppError("Menu ID is required", STATUS.BAD_REQUEST);
    }

    const requesterId = request.body.payload.id;
    const requester = await prisma.user.findUnique({
      where: {
        id: requesterId,
      },
    });

    if (
      !requester ||
      (requester.role !== "Seller" && requester.role != "Admin")
    ) {
      throw new AppError("Unauthorized", STATUS.UNAUTHORIZED);
    }

    const existingMenu = await prisma.menu.findUnique({
      where: {
        id,
      },
    });

    if (!existingMenu) {
      throw new AppError("Menu not found", STATUS.NOT_FOUND);
    }

    const deleteMenu = await prisma.menu.delete({
      where: {
        id,
      },
    });

    response.send({
      message: "Menu deleted successfully!",
      data: deleteMenu,
    });
  } catch (error) {
    next(error);
  }
};
export default { getMenu, createMenu, editMenu, deleteMenu };
