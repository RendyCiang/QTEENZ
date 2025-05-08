import { RequestHandler, response } from "express";
import { prisma } from "../config/config";
import { STATUS } from "../utils/http/statusCodes";
import { AppError } from "../utils/http/AppError";

type Variant = {
  size: string;
  price: number;
  stock: number;
};

const getMenu: RequestHandler = async (request, response, next) => {
  try {
    const menuData = await prisma.menu.findMany({
      include: {
        vendor: true,
        menuVariants: true,
      },
    });
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
    const { name, description, categoryId, photo, variants } = request.body;

    if (!name) {
      throw new AppError("Name is required", STATUS.BAD_REQUEST);
    }

    if (!description) {
      throw new AppError("Description is required", STATUS.BAD_REQUEST);
    }

    if (!categoryId) {
      throw new AppError("Category ID is required", STATUS.BAD_REQUEST);
    }

    if (!photo) {
      throw new AppError("Photo is required", STATUS.BAD_REQUEST);
    }

    if (!variants || variants.length === 0) {
      throw new AppError(
        "At least one variant is required",
        STATUS.BAD_REQUEST
      );
    }

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
        description,
        photo,
        categoryId,
        vendorId,
      },
    });

    const createdVariants = [];
    for (const variant of variants) {
      const createdVariant = await prisma.menuVariant.create({
        data: {
          name: variant.name,
          price: variant.price,
          stock: variant.stock,
          menuId: newMenu.id,
        },
      });
      createdVariants.push(createdVariant);
    }

    response.send({
      message: "Menu created successfully!",
      data: {
        ...newMenu,
        menuVariants: createdVariants,
      },
    });
  } catch (error) {
    next(error);
  }
};

const editMenu: RequestHandler = async (request, response, next) => {
  try {
    const { id } = request.params;
    const { name, description, stock, categoryId, photo, status, variants } =
      request.body;

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
      (requester.role !== "Seller" && requester.role !== "Admin")
    ) {
      throw new AppError("Unauthorized", STATUS.UNAUTHORIZED);
    }

    const existingMenu = await prisma.menu.findUnique({
      where: {
        id,
      },
      include: {
        menuVariants: true,
      },
    });

    if (!existingMenu) {
      throw new AppError("Menu not found", STATUS.NOT_FOUND);
    }

    let vendorId = existingMenu.vendorId;

    if (requester.role === "Seller") {
      const vendor = await prisma.vendor.findUnique({
        where: {
          userId: requester.id,
        },
      });

      if (!vendor || vendor.id !== vendorId) {
        throw new AppError("Unauthorized", STATUS.FORBIDDEN);
      }
    }

    if (stock !== undefined && stock < 0) {
      throw new AppError("Stock must be at least 0", STATUS.BAD_REQUEST);
    }

    const updatedMenu = await prisma.menu.update({
      where: { id },
      data: {
        name: name || existingMenu.name,
        description: description || existingMenu.description,
        photo: photo || existingMenu.photo,
        categoryId: categoryId || existingMenu.categoryId,
        vendorId,
        status: status || existingMenu.status,
        menuVariants: {
          upsert: variants.map((variant: Variant) => ({
            where: {
              menuId_size: {
                menuId: id,
                size: variant.size,
              },
            },
            update: {
              price: variant.price,
              stock: variant.stock,
            },
            create: {
              size: variant.size,
              price: variant.price,
              stock: variant.stock,
              menuId: id,
            },
          })),
        },
      },
      include: {
        menuVariants: true,
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
