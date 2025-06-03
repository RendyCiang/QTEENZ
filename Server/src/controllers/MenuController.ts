import { RequestHandler, response } from "express";
import { prisma } from "../config/config";
import { STATUS } from "../utils/http/statusCodes";
import { AppError } from "../utils/http/AppError";

type Variant = {
  name: string;
  price: number;
  stock: number;
};

const getMenu: RequestHandler = async (request, response, next) => {
  try {
    const menuData = await prisma.menu.findMany({
      include: {
        vendor: {
          select: {
            name: true,
            location: true,
            rating: true,
            open_hour: true,
            close_hour: true,
            status: true,
            user: {
              select: {
                id: true,
                photo: true,
              },
            },
          },
        },
        menuVariants: true,
        category: {
          select: {
            name: true,
          },
        },
      },
      where: {
        isArchived: false,
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

const getMenuById: RequestHandler = async (request, response, next) => {
  try {
    const { id } = request.params;

    if (!id) {
      throw new AppError("Menu ID is required", STATUS.BAD_REQUEST);
    }

    const menuData = await prisma.menu.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        description: true,
        photo: true,
        status: true,
        vendorId: true,
        vendor: {
          select: {
            name: true,
            location: true,
            rating: true,
            open_hour: true,
            close_hour: true,
            status: true,
            delivery_status: true,
          },
        },
        menuVariants: {
          select: {
            id: true,
            name: true,
            price: true,
            stock: true,
          },
        },
        category: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!menuData) {
      throw new AppError("Menu not found", STATUS.NOT_FOUND);
    }

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

    if (requester.role === "Seller") {
      const vendor = await prisma.vendor.findUnique({
        where: {
          userId: requester.id,
        },
      });

      if (!vendor || vendor.id !== existingMenu.vendorId) {
        throw new AppError(
          `Vendor ID ${vendor?.id} tidak sama dengan existing menu vendor ID ${existingMenu.vendorId}`,
          STATUS.FORBIDDEN
        );
      }
    }

    if (stock !== undefined && stock < 0) {
      throw new AppError("Stock must be at least 0", STATUS.BAD_REQUEST);
    }

    const updatedMenu = await prisma.menu.update({
      where: {
        id,
      },
      data: {
        name: name || existingMenu.name,
        description: description || existingMenu.description,
        photo: photo || existingMenu.photo,
        categoryId: categoryId || existingMenu.categoryId,
        vendorId: existingMenu.vendorId,
        status: status || existingMenu.status,
        menuVariants: {
          upsert: variants.map((variant: Variant) => ({
            where: {
              menuId_name: {
                menuId: id,
                name: variant.name,
              },
            },
            update: {
              price: variant.price,
              stock: variant.stock,
            },
            create: {
              name: variant.name,
              price: variant.price,
              stock: variant.stock,
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

const archivedMenu: RequestHandler = async (request, response, next) => {
  try {
    const { id } = request.params;
    const { isArchived } = request.body;

    if (isArchived === undefined) {
      throw new AppError("Archived is required", STATUS.BAD_REQUEST);
    }

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

    if (requester.role === "Seller") {
      const vendor = await prisma.vendor.findUnique({
        where: {
          userId: requester.id,
        },
      });

      if (!vendor || vendor.id !== existingMenu.vendorId) {
        throw new AppError(
          "You do not have permission to modify this menu",
          STATUS.FORBIDDEN
        );
      }
    }

    const archivedMenu = await prisma.menu.update({
      where: {
        id,
      },
      data: {
        isArchived: isArchived,
      },
    });

    response.send({
      message:
        isArchived === true || isArchived === 1
          ? "Menu archived successfully!"
          : "Menu unarchived successfully!",
      data: archivedMenu,
    });
  } catch (error) {
    next(error);
  }
};

const vendorMenuList: RequestHandler = async (request, response, next) => {
  try {
    const requesterId = request.body.payload.id;
    const { userId } = request.params;

    const requester = await prisma.user.findUnique({
      where: {
        id: requesterId,
      },
    });

    // Check role
    if (
      !requester ||
      (requester.role !== "Seller" && requester.role !== "Admin")
    ) {
      throw new AppError("Unauthorized", STATUS.UNAUTHORIZED);
    }

    if (requester.role === "Seller" && requester.id !== userId) {
      throw new AppError(
        "You only have access to your own menus",
        STATUS.FORBIDDEN
      );
    }

    const vendor = await prisma.vendor.findUnique({
      where: {
        userId,
      },
    });

    if (!vendor) {
      throw new AppError("Vendor not found", STATUS.NOT_FOUND);
    }

    const menuData = await prisma.menu.findMany({
      where: { vendorId: vendor.id },
      include: {
        menuVariants: true,
        category: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!menuData || menuData.length === 0) {
      throw new AppError("Menu not found", STATUS.NOT_FOUND);
    }

    const groupedData = [
      {
        vendor: {
          name: vendor.name,
          location: vendor.location,
          rating: vendor.rating,
          open_hour: vendor.open_hour,
          close_hour: vendor.close_hour,
          status: vendor.status,
        },
        menus: menuData,
      },
    ];

    response.send({
      message: "Menu retrieved successfully!",
      data: groupedData,
    });
  } catch (error) {
    next(error);
  }
};

const getIsArchived: RequestHandler = async (request, response, next) => {
  try {
    const requesterId = request.body.payload.id;
    const requester = await prisma.user.findUnique({
      where: {
        id: requesterId,
      },
    });

    // Check role
    if (!requester || requester.role !== "Seller") {
      throw new AppError("Unauthorized", STATUS.UNAUTHORIZED);
    }

    const vendor = await prisma.vendor.findUnique({
      where: {
        userId: requester.id,
      },
    });

    if (!vendor) {
      throw new AppError("Vendor not found", STATUS.NOT_FOUND);
    }

    const menuData = await prisma.menu.findMany({
      where: {
        vendorId: vendor.id,
        isArchived: true,
      },
      include: {
        vendor: {
          select: {
            name: true,
            location: true,
            rating: true,
            open_hour: true,
            close_hour: true,
            status: true,
          },
        },
        menuVariants: true,
        category: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!menuData) {
      throw new AppError("Menu not found", STATUS.NOT_FOUND);
    }
    response.send({
      message: "Menu retrieved successfully!",
      data: menuData,
    });
  } catch (error) {
    next(error);
  }
};

const deleteMenuVariant: RequestHandler = async (request, response, next) => {
  try {
    const { id } = request.params;

    if (!id) {
      throw new AppError("Menu Variant ID is required", STATUS.BAD_REQUEST);
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

    const existingVariant = await prisma.menuVariant.findUnique({
      where: {
        id,
      },
    });

    if (!existingVariant) {
      throw new AppError("Menu Variant not found", STATUS.NOT_FOUND);
    }

    const variant = await prisma.menuVariant.delete({
      where: {
        id,
      },
    });

    response.send({
      message: "Menu Variant deleted successfully!",
      data: variant,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getMenu,
  createMenu,
  editMenu,
  deleteMenu,
  getMenuById,
  archivedMenu,
  vendorMenuList,
  getIsArchived,
  deleteMenuVariant,
};
