import e, { request, RequestHandler, response } from "express";
import { AppError } from "../utils/http/AppError";
import { STATUS } from "../utils/http/statusCodes";
import { prisma } from "../config/config";
import bcrypt from "bcryptjs";
import { createJWT } from "../utils/helper";

const Register: RequestHandler = async (request, response, next) => {
  try {
    const {
      name,
      email,
      password,
      first_name,
      last_name,
      vendorCode,
      role,
      location,
      phone,
      open_hour,
      close_hour,
      bank_account,
    } = request.body;

    if (!name) {
      throw new AppError("Name is required", STATUS.BAD_REQUEST);
    }
    if (!password) {
      throw new AppError("Password is required", STATUS.BAD_REQUEST);
    }

    if (!phone) {
      throw new AppError("Phone is required", STATUS.BAD_REQUEST);
    }

    if (role === "Buyer" && !first_name && !last_name) {
      throw new AppError(
        "first name or last name is required for Buyer",
        STATUS.BAD_REQUEST
      );
    }
    if (role === "Seller") {
      if (!vendorCode) {
        throw new AppError(
          "Vendor code is required for Seller",
          STATUS.BAD_REQUEST
        );
      }

      if (!location) {
        throw new AppError(
          "Location is required for Seller",
          STATUS.BAD_REQUEST
        );
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.includes("'")) {
      throw new AppError(
        "Email cannot contain special characters",
        STATUS.BAD_REQUEST
      );
    }

    if (!emailRegex.test(email)) {
      throw new AppError("Email format is invalid", STATUS.BAD_REQUEST);
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      throw new AppError("Email already registered", STATUS.BAD_REQUEST);
    }

    const existingPhone = await prisma.user.findUnique({
      where: {
        phone,
      },
    });

    if (existingPhone) {
      throw new AppError("Phone number already registered", STATUS.BAD_REQUEST);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email: email || null,
        phone,
        password: hashedPassword,
        role,
      },
    });

    if (role === "Buyer") {
      await prisma.buyer.create({
        data: {
          first_name,
          last_name,
          userId: newUser.id,
        },
      });
    } else if (role === "Seller") {
      const newSeller = await prisma.vendor.create({
        data: {
          name,
          location,
          open_hour,
          close_hour,
          status: "Close",
          bank_account: "",
          rating: 0,
          userId: newUser.id,
        },
      });
    }
    const jwtToken = createJWT(newUser);
    if (!jwtToken) {
      throw new AppError(
        "Failed to create JWT token",
        STATUS.INTERNAL_SERVER_ERROR
      );
    }
    response.send({
      message: "Login successful",
      data: newUser,
      token: jwtToken,
    });
  } catch (error) {
    next(error);
  }
};

const Login: RequestHandler = async (request, response, next) => {
  try {
    const { identity, password } = request.body;

    if (!identity) {
      throw new AppError("Email or phone is required", STATUS.BAD_REQUEST);
    }

    if (!password) {
      throw new AppError("Password is required", STATUS.BAD_REQUEST);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const phoneRegex = /^(?:\+62|62|0)8[1-9][0-9]{6,9}$/;

    let user;

    if (emailRegex.test(identity)) {
      // Login email
      user = await prisma.user.findUnique({
        where: {
          email: identity.toLowerCase(),
        },
      });
    } else if (phoneRegex.test(identity)) {
      // Login phone
      user = await prisma.user.findUnique({
        where: {
          phone: identity,
        },
      });
    }

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new AppError(
        "Invalid email/phone or password",
        STATUS.UNAUTHORIZED
      );
    }

    const jwtToken = createJWT(user);
    if (!jwtToken) {
      throw new AppError(
        "Failed to create JWT token",
        STATUS.INTERNAL_SERVER_ERROR
      );
    }

    response.send({
      message: "Login successful",
      data: user,
      token: jwtToken,
    });
  } catch (error) {
    next(error);
  }
};
export default { Register, Login };
