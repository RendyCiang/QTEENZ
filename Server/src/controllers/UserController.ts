import { RequestHandler } from "express";
import { prisma } from "../config/config";
import { STATUS } from "../utils/http/statusCodes";
import { AppError } from "../utils/http/AppError";
import bcrypt from "bcryptjs";
import { Bank_Account } from "@prisma/client";

const getUser: RequestHandler = async (request, response, next) => {
  try {
    const dataUser = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        phone: true,
        photo: true,
        role: true,
        buyer: {
          select: {
            first_name: true,
            last_name: true,
          },
        },
        vendor: {
          select: {
            name: true,
            vendor_name: true,
            location: true,
            open_hour: true,
            close_hour: true,
            status: true,
            bank_account: true,
            bank_type: true,
          },
        },
      },
    });
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
    const requesterId = request.body.payload.id;
    const { id } = request.params;

    const requester = await prisma.user.findUnique({
      where: {
        id: requesterId,
      },
    });

    if (!requester) {
      throw new AppError("User ID not found", STATUS.UNAUTHORIZED);
    }

    const userIdToFetch = requester.role === "Admin" && id ? id : requesterId;

    let userProfile;
    if (requester.role === "Admin" && id) {
      userProfile = await prisma.user.findUnique({
        where: {
          id: userIdToFetch,
        },
        include: {
          buyer: true,
          vendor: true,
        },
      });
    } else {
      if (requester.role === "Buyer") {
        userProfile = await prisma.buyer.findUnique({
          where: {
            userId: userIdToFetch,
          },
          include: {
            user: true,
          },
        });
      } else if (requester.role === "Seller") {
        userProfile = await prisma.vendor.findUnique({
          where: {
            userId: userIdToFetch,
          },
          include: {
            user: true,
          },
        });
      }
    }

    if (!userProfile) {
      throw new AppError("User not found", STATUS.NOT_FOUND);
    }

    response.send({
      message: "Profile retrieved successfully!",
      data: userProfile,
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
      bank_type,
      vendor_name,
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
            bank_type: bank_type,
            rating: 0,
            vendor_name: vendor_name,
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
          name: name || user.vendor?.name,
          vendor_name: vendor_name || user.vendor?.vendor_name,
          location: location || user.vendor?.location,
          open_hour: open_hour || user.vendor?.open_hour,
          close_hour: close_hour || user.vendor?.close_hour,
          status: status,
          bank_account: bank_account,
          bank_type: bank_type,
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

const changePassword: RequestHandler = async (request, response, next) => {
  try {
    const { id } = request.params;
    const { oldPassword, newPassword } = request.body;

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new AppError("User not found", STATUS.NOT_FOUND);
    }

    const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordMatch) {
      throw new AppError("Password Lama Salah", STATUS.UNAUTHORIZED);
    }

    if (oldPassword === newPassword) {
      throw new AppError(
        "Password baru tidak boleh sama dengan password lama",
        STATUS.BAD_REQUEST
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        password: hashedPassword,
      },
    });

    response.send({
      message: "Password updated successfully!",
    });
  } catch (error) {
    next(error);
  }
};

export default { getUser, editUser, deleteUser, getProfile, changePassword };
