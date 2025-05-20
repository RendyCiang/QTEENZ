import { RequestHandler } from "express";
import { prisma } from "../config/config";
import { AppError } from "../utils/http/AppError";
import { STATUS } from "../utils/http/statusCodes";

const getFavoriteBuyer: RequestHandler = async (request, response, next) => {
  try {
    const requester = request.body.payload;
    const requesterId = requester.id;

    const buyer = await prisma.buyer.findUnique({
      where: {
        userId: requesterId,
      },
    });

    if (!buyer) {
      throw new AppError(
        "Only buyers can access favorite menus",
        STATUS.UNAUTHORIZED
      );
    }

    const favorite = await prisma.favoriteBuyer.findMany({
      where: {
        buyerId: buyer.id,
      },
      include: {
        menu: true,
      },
    });

    response.send({
      message: "Favorite menu retrieved successfully!",
      data: favorite,
    });
  } catch (error) {
    next(error);
  }
};

const addFavorite: RequestHandler = async (request, response, next) => {
  try {
    const { menuId } = request.body;
    const requester = request.body.payload;
    const requesterId = requester.id;

    if (!menuId) {
      throw new AppError("Menu ID is required", STATUS.BAD_REQUEST);
    }

    // Ngambil buyerId berdasarkan userId yang lgin
    const buyer = await prisma.buyer.findUnique({
      where: {
        userId: requesterId,
      },
    });

    if (!buyer) {
      throw new AppError("Only buyers can add favorites", STATUS.UNAUTHORIZED);
    }

    // Cek menu udh difavorit
    const favorite = await prisma.favoriteBuyer.findFirst({
      where: {
        buyerId: buyer.id,
        menuId,
      },
    });

    if (favorite) {
      throw new AppError("Menu already favorited", STATUS.BAD_REQUEST);
    }

    const newFavorite = await prisma.favoriteBuyer.create({
      data: {
        buyerId: buyer.id,
        menuId,
      },
    });

    response.send({
      message: "Menu favorited successfully!",
      data: newFavorite,
    });
  } catch (error) {
    next(error);
  }
};

const deleteFavorite: RequestHandler = async (request, response, next) => {
  try {
    const { id } = request.params;

    if (!id) {
      throw new AppError("ID is required", 400);
    }

    const favorite = await prisma.favoriteBuyer.findUnique({
      where: {
        id,
      },
    });

    if (!favorite) {
      throw new AppError("Favorite menu not found", 404);
    }

    await prisma.favoriteBuyer.delete({
      where: {
        id,
      },
    });

    response.send({
      message: "Favorite menu deleted successfully!",
    });
  } catch (error) {
    next(error);
  }
};

export default { getFavoriteBuyer, addFavorite, deleteFavorite };
