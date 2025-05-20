import e, { request, RequestHandler, response } from "express";
import { AppError } from "../utils/http/AppError";
import { STATUS } from "../utils/http/statusCodes";
import { prisma } from "../config/config";
import bcrypt from "bcryptjs";
import { createJWT } from "../utils/helper";
import {
  validateLogin,
  validateRegister,
  validateRequest,
} from "../schema/authSchema";
import { Bank_Account } from "@prisma/client";

const Register: RequestHandler = async (request, response, next) => {
  try {
    const validatedData = validateRegister.parse(request.body);
    const { role, email, phone, password } = validatedData;

    const existingUser = await prisma.user.findUnique({
      where: {
        email: email || "",
      },
    });

    if (existingUser) {
      throw new AppError("Email already registered", STATUS.BAD_REQUEST);
    }

    if (phone) {
      const existingPhone = await prisma.user.findUnique({
        where: {
          phone,
        },
      });

      if (existingPhone) {
        throw new AppError(
          "Phone number already registered",
          STATUS.BAD_REQUEST
        );
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Email || Phone Optional
    const newUser = await prisma.user.create({
      data: {
        email: email || null,
        phone: phone || null,
        password: hashedPassword,
        role,
      },
    });

    if (role === "Buyer") {
      const { first_name, last_name } = validatedData;
      await prisma.buyer.create({
        data: {
          first_name,
          last_name,
          userId: newUser.id,
        },
      });
    } else if (role === "Seller") {
      const { name, location, open_hour, close_hour, bank_account, bank_type } =
        validatedData;
      await prisma.vendor.create({
        data: {
          name,
          location,
          open_hour,
          close_hour,
          status: "Close",
          bank_account: "",
          bank_type: Bank_Account.BCA,
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
    const validatedData = validateLogin.parse(request.body);
    const { identity, password } = validatedData;

    let user;

    if (identity.includes("@")) {
      // Login email
      user = await prisma.user.findUnique({
        where: {
          email: identity,
        },
      });
    } else {
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

const Request: RequestHandler = async (request, response, next) => {
  try {
    const validatedData = validateRequest.parse(request.body);
    const {
      name,
      email,
      phone,
      vendor_name,
      location,
      open_hour,
      close_hour,
      photo,
      document,
      proposal,
      bank_type,
      bank_account,
    } = validatedData;

    const newRequest = await prisma.request.create({
      data: {
        name,
        email,
        phone,
        vendor_name,
        location,
        open_hour,
        close_hour,
        photo,
        document,
        proposal,
        bank_type,
        bank_account,
      },
    });

    response.send({
      message: "Request created successfully",
      data: newRequest,
    });
  } catch (error) {
    next(error);
  }
};

export default { Register, Login, Request };
