import { ZodError } from "zod";
import { AppError } from "../utils/http/AppError";
import { ErrorRequestHandler } from "express";

const IS_PRODUCTION = process.env.ENVIROMENT === "PROD";

/**
 * Error Handling middleware
 */
const errorHandler: ErrorRequestHandler = async (
  error: AppError | Error,
  _,
  response,
  __
) => {
  if (error instanceof AppError) {
    response.status(error.statusCode).send({
      status: error.status,
      statusCode: error.statusCode,
      message: error.message,
      ...(IS_PRODUCTION ? {} : { stack: error.stack }),
    });

    return;
  }

  if (error instanceof ZodError) {
    response.status(400).send({
      status: "fail",
      statusCode: 400,
      message: error.errors.map((err) => err.message),
    });

    return;
  }

  response.status(500).send({
    status: "fail",
    statusCode: 500,
    message: "Oops, Something went very wrong!",
    ...(IS_PRODUCTION ? {} : { stack: error.stack }),
  });
};

export default errorHandler;
