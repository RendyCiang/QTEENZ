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

const getProfile: RequestHandler = async (request, response, next) => {
  try {
    const requester = request.body.payload.id;

    if (!requester) {
      throw new AppError("User ID not found", STATUS.UNAUTHORIZED);
    }

    const user = await prisma.user.findUnique({
      where: {
        id: requester,
      },
      include: {
        buyer: true,
        vendor: true,
      },
    });

    if (!user) {
      throw new AppError("User not found", STATUS.NOT_FOUND);
    }

    response.send({
      message: "Profile retrieved successfully!",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const editUser: RequestHandler = async (request, response, next) => {
  try {
    const { id } = request.params;
    const {
      name,
      email,
      password,
      role,
      vendorCode,
      phone,
      photo,
      first_name,
      last_name,
      location,
      open_hour,
      close_hour,
      status,
      bank_account,
    } = request.body;

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        buyer: true,
        vendor: true,
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
      if (role && role !== user.role) {
        throw new AppError("You cannot change your own role", STATUS.FORBIDDEN);
      }
      if (vendorCode) {
        throw new AppError("You cannot update vendor code", STATUS.FORBIDDEN);
      }
    }

    if (requester.role === "Admin" && role !== user.role) {
      if (role === "Buyer") {
        if (!first_name) {
          throw new AppError("first name is required", STATUS.BAD_REQUEST);
        }

        if (!last_name) {
          throw new AppError("last name is required", STATUS.BAD_REQUEST);
        }

        if (vendorCode || location || name) {
          throw new AppError("Invalid fields for buyer", STATUS.BAD_REQUEST);
        }

        if (user.vendor) {
          await prisma.vendor.delete({
            where: {
              userId: user.id,
            },
          });
        }

        await prisma.buyer.create({
          data: {
            first_name,
            last_name,
            userId: user.id,
          },
        });
      } else if (role === "Seller") {
        if (!vendorCode) {
          throw new AppError("Vendor code is required", STATUS.BAD_REQUEST);
        }

        if (!location) {
          throw new AppError("Location is required", STATUS.BAD_REQUEST);
        }

        if (!name) {
          throw new AppError(
            "Name is required when changing to Seller",
            STATUS.BAD_REQUEST
          );
        }

        if (first_name || last_name) {
          throw new AppError(
            "first name and last name is not allowed",
            STATUS.BAD_REQUEST
          );
        }

        if (last_name) {
          throw new AppError(
            "Last name is not allowed when changing to Seller",
            STATUS.BAD_REQUEST
          );
        }

        if (user.buyer) {
          await prisma.buyer.delete({
            where: {
              userId: user.id,
            },
          });
        }

        await prisma.vendor.create({
          data: {
            name,
            location: location,
            open_hour: open_hour,
            close_hour: close_hour,
            status: status,
            bank_account: bank_account,
            rating: 0,
            userId: user.id,
          },
        });
      }
    }

    if (user.role === "Seller") {
      await prisma.vendor.update({
        where: {
          userId: user.id,
        },
        data: {
          name,
          location: location || user.vendor?.location,
          open_hour: open_hour || user.vendor?.open_hour,
          close_hour: close_hour || user.vendor?.close_hour,
          status: status,
          bank_account: bank_account,
        },
      });
    }

    if (user.role === "Buyer") {
      await prisma.buyer.update({
        where: {
          userId: user.id,
        },
        data: {
          first_name,
          last_name,
        },
      });
    }

    const updatedUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        email: email || user.email,
        password: hashedPassword,
        photo: photo || user.photo,
        phone: phone || user.phone,
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

    const seller = await prisma.vendor.findUnique({
      where: {
        userId: id,
      },
    });

    if (seller) {
      await prisma.vendor.delete({
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

export default { getUser, editUser, deleteUser, getProfile };
