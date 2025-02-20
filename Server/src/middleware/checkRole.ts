import { RequestHandler } from "express";
import { STATUS } from "../utils/http/statusCodes";
import { AppError } from "../utils/http/AppError";

export const checkRole = (allowedRoles: string[]): RequestHandler => {
  return (request, response, next) => {
    try {
      const { role } = request.body.payload;

      if (!allowedRoles.includes(role)) {
        throw new AppError(
          "Unauthorized: You don't have permission",
          STATUS.FORBIDDEN
        );
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};
