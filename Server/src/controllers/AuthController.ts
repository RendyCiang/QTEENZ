import e, { request, RequestHandler, response } from "express";
import { AppError } from "../utils/http/AppError";
import { STATUS } from "../utils/http/statusCodes";
import { prisma } from "../config/config";
import bcrypt from "bcryptjs";
import { createJWT } from "../utils/helper";

const Register: RequestHandler = async (request, response, next) => {
  try {
    const { name, email, password, nim, vendorCode, role } = request.body;

    if (!name) {
      throw new AppError("Name is required", STATUS.BAD_REQUEST);
    }
    if (!email) {
      throw new AppError("Email is required", STATUS.BAD_REQUEST);
    }
    if (!password) {
      throw new AppError("Password is required", STATUS.BAD_REQUEST);
    }
    if (role === "Buyer" && !nim) {
      throw new AppError("NIM is required for Buyer", STATUS.BAD_REQUEST);
    }
    if (role === "Seller" && !vendorCode) {
      throw new AppError(
        "Vendor code is required for Seller",
        STATUS.BAD_REQUEST
      );
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

    const hashedPassword = await bcrypt.hash(password, 10);
    const userCount = await prisma.user.count();
    const id = "USR" + (userCount + 1).toString().padStart(4, "0");

    const newUser = await prisma.user.create({
      data: {
        id,
        name,
        email,
        password: hashedPassword,
        role,
      },
    });

    if (role === "Buyer") {
      const existingNIM = await prisma.buyer.findUnique({
        where: {
          nim,
        },
      });

      if (existingNIM) {
        throw new AppError("NIM already registered", STATUS.BAD_REQUEST);
      }

      const buyerCount = await prisma.buyer.count();
      const id = "BUY" + (buyerCount + 1).toString().padStart(4, "0");
      await prisma.buyer.create({
        data: {
          id,
          nim,
          userId: newUser.id,
        },
      });
    } else if (role === "Seller") {
      const existingVendorCode = await prisma.vendorCode.findUnique({
        where: {
          code: vendorCode,
        },
      });

      if (!existingVendorCode) {
        throw new AppError(
          "Invalid vendor code or vendor code already registered",
          STATUS.BAD_REQUEST
        );
      }

      const sellerCount = await prisma.seller.count();
      const id = "SEL" + (sellerCount + 1).toString().padStart(4, "0");
      await prisma.seller.create({
        data: {
          id,
          vendorCodeId: existingVendorCode.id,
          userId: newUser.id,
        },
      });

      await prisma.vendorCode.update({
        where: {
          id: existingVendorCode.id,
        },
        data: {
          isUsed: true,
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
    const { email, password } = request.body;

    if (!email) {
      throw new AppError("Email is required", STATUS.BAD_REQUEST);
    }

    if (!password) {
      throw new AppError("Password is required", STATUS.BAD_REQUEST);
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

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new Error("Email not found");
    }

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new AppError("Invalid email or password", STATUS.UNAUTHORIZED);
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
