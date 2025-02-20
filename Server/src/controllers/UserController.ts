import { RequestHandler } from "express";
import { prisma } from "../config/config";
import { STATUS } from "../utils/http/statusCodes";
import { AppError } from "../utils/http/AppError";
import bcrypt from "bcryptjs";

const getUser: RequestHandler = async (request, response, next) => {
  try {
    const dataUser = await prisma.user.findMany();
    response.send({
      message: "Registered users retrieved successfully!",
      data: dataUser,
    });
  } catch (error) {
    next(error);
  }
};

const editUser: RequestHandler = async (request, response, next) => {
  try {
    const { id } = request.params;
    const { name, email, password, role, vendorCode, nim } = request.body;

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        buyer: true,
        seller: true,
      },
    });

    if (!user) {
      throw new AppError("User not found", STATUS.NOT_FOUND);
    }

    // Cek siapa yang sedang melakukan edit
    const requesterId = request.body.payload.id;
    const requester = await prisma.user.findUnique({
      where: { id: requesterId },
    });

    if (!requester) {
      throw new AppError("Unauthorized", STATUS.UNAUTHORIZED);
    }

    let hashedPassword = user.password;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    if (requester.role !== "Admin") {
      if (name || role || vendorCode || nim) {
        throw new AppError(
          "You are only allowed to update email and password",
          STATUS.FORBIDDEN
        );
      }
    }

    if (requester.role === "Admin" && role !== user.role) {
      if (role === "Buyer") {
        if (!nim) {
          throw new AppError(
            "NIM is required when changing to Buyer",
            STATUS.BAD_REQUEST
          );
        }
        if (vendorCode) {
          throw new AppError(
            "Vendor code is not allowed when changing to Buyer",
            STATUS.BAD_REQUEST
          );
        }

        if (user.seller) {
          await prisma.seller.delete({
            where: {
              userId: user.id,
            },
          });
        }

        const existingNIM = await prisma.buyer.findUnique({
          where: {
            nim,
          },
        });

        if (existingNIM) {
          throw new AppError("NIM already registered", STATUS.BAD_REQUEST);
        }
        const buyerCount = await prisma.buyer.count();
        const buyerId = "BUY" + (buyerCount + 1).toString().padStart(4, "0");

        await prisma.buyer.create({
          data: {
            id: buyerId,
            nim,
            userId: user.id,
          },
        });
      } else if (role === "Seller") {
        if (!vendorCode) {
          throw new AppError(
            "Vendor code is required when changing to Seller",
            STATUS.BAD_REQUEST
          );
        }

        const existingVendorCode = await prisma.vendorCode.findUnique({
          where: { code: vendorCode },
        });

        if (!existingVendorCode) {
          throw new AppError("Invalid vendor code", STATUS.BAD_REQUEST);
        }

        if (user.buyer) {
          await prisma.buyer.delete({
            where: {
              userId: user.id,
            },
          });
        }

        const sellerCount = await prisma.seller.count();
        const sellerId = "SEL" + (sellerCount + 1).toString().padStart(4, "0");

        await prisma.seller.create({
          data: {
            id: sellerId,
            vendorCodeId: existingVendorCode.id,
            userId: user.id,
          },
        });

        // Tandai vendorCode sebagai sudah digunakan
        await prisma.vendorCode.update({
          where: { id: existingVendorCode.id },
          data: { isUsed: true },
        });
      }
    }

    const updatedUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name: name || user.name,
        email: email || user.email,
        password: hashedPassword,
        role,
      },
    });

    response.send({
      message: "User updated successfully!",
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

const deleteUser: RequestHandler = async (request, response, next) => {
  try {
    const { id } = request.params;

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new AppError("User not found", STATUS.NOT_FOUND);
    }

    const requesterId = request.body.payload.id;
    const requester = await prisma.user.findUnique({
      where: {
        id: requesterId,
      },
    });

    if (!requester || requester.role !== "Admin") {
      throw new AppError(
        "You are not allowed to delete this user",
        STATUS.FORBIDDEN
      );
    }

    const seller = await prisma.seller.findUnique({
      where: {
        userId: id,
      },
    });

    if (seller) {
      await prisma.seller.delete({
        where: {
          userId: id,
        },
      });
    }

    const buyer = await prisma.buyer.findUnique({
      where: {
        userId: id,
      },
    });

    if (buyer) {
      await prisma.buyer.delete({
        where: {
          userId: id,
        },
      });
    }

    await prisma.user.delete({ where: { id } });

    response.send({ message: "User deleted successfully!" });
  } catch (error) {
    next(error);
  }
};

export default { getUser, editUser, deleteUser };
