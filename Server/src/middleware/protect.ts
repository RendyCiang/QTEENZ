import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config";
import { RequestHandler } from "express";

export const protect: RequestHandler = async (request, response, next) => {
  try {
    const bearerToken = request.headers.authorization;
    if (!bearerToken) {
      throw new Error("Please provide a token");
    }
    const token = bearerToken.split(" ")[1];

    const payload = jwt.verify(token, JWT_SECRET) as {
      id: string;
      email: string;
      role: string;
    };

    if (!payload) {
      throw new Error("Unauthorized: Invalid token");
    }

    request.body.payload = payload;
    next();
  } catch (error) {
    next(error);
  }
};
