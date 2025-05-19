import { request, RequestHandler, response } from "express";
import { prisma } from "../config/config";
import { AppError } from "../utils/http/AppError";
import { STATUS } from "../utils/http/statusCodes";

const getCategory: RequestHandler = async (request, response, next) => {
  try {
    const categoriesData = await prisma.category.findMany();

    response.send({
      message: "Categories retrieved successfully!",
      data: categoriesData,
    });
  } catch (error) {
    next(error);
  }
};

const createCategory: RequestHandler = async (request, response, next) => {
  try {
    const { name, photo } = request.body;

    if (!name) {
      throw new Error("Name is required");
    }

    if (!photo) {
      throw new Error("Photo is required");
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

    const newCategory = await prisma.category.create({
      data: {
        name,
        photo,
      },
    });

    response.send({
      message: "Category created successfully!",
      data: newCategory,
    });
  } catch (error) {
    next(error);
  }
};

const editCategory: RequestHandler = async (request, response, next) => {
  try {
    const { id } = request.params;

    if (!id) {
      throw new Error("Category ID is required");
    }

    const { name, photo } = request.body;

    if (!name) {
      throw new Error("Name is required");
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

    const existingCategory = await prisma.category.findUnique({
      where: { id },
    });

    if (!existingCategory) {
      throw new Error("Category not found");
    }

    const updatedCategory = await prisma.category.update({
      where: {
        id,
      },
      data: {
        name: name ?? existingCategory.name,
        photo: photo ?? existingCategory.photo,
      },
    });

    response.send({
      message: "Category updated successfully!",
      data: updatedCategory,
    });
  } catch (error) {
    next(error);
  }
};

const deleteCategory: RequestHandler = async (request, response, next) => {
  try {
    const { id } = request.params;

    if (!id) {
      throw new Error("Category ID is required");
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

    const category = await prisma.category.findUnique({
      where: {
        id,
      },
    });

    if (!category) {
      throw new Error("Category not found");
    }

    await prisma.category.delete({
      where: {
        id,
      },
    });

    response.send({
      message: "Category deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export default { getCategory, createCategory, editCategory, deleteCategory };
