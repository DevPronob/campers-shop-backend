import { ErrorRequestHandler, Request, Response, NextFunction } from "express";
import handleDuplicateError from "../errors/handleDuplicateError";
import handleValidationError from "../errors/handleValidationError";
import handleZodError from "../errors/handleZodError";
import handleCastError from "../errors/handleCastError";
import AppError from "../errors/AppError";
import { ZodError } from "zod";
// import config from "../config"; // uncomment if you need NODE_ENV

const globalErrorHandler: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Default values
  let statusCode = err.statusCode || 500;
  let message = err.message || "Something went wrong!";
  let errorSources = [
    {
      path: "",
      message: "Something went wrong!",
    },
  ];

  // 🔹 Handle Mongoose duplicate key error
  if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  }
  // 🔹 Handle Mongoose validation error
  else if (err?.name === "ValidationError") {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  }
  // 🔹 Handle Zod validation error
  else if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  }
  // 🔹 Handle Mongoose cast error (invalid ObjectId, etc.)
  else if (err?.name === "CastError") {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  }
  // 🔹 Handle custom AppError
  else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    errorSources = [
      {
        path: "",
        message: err.message,
      },
    ];
  }

  // Final response
  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    // stack: config.NODE_ENV === "development" ? err.stack : null,
  });
};

export default globalErrorHandler;
