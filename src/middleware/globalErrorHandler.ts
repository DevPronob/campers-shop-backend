

import { NextFunction, Request, Response } from "express";
import handleDuplicateError from "../errors/handleDuplicateError";
import handleCastError from "../errors/handleCastError";
import handleZodError from "../errors/handleZodError";
import handleValidationError from "../errors/handleValidationError";
import AppError from "../errors/AppError";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let errorSources: any[] = [];
  let statusCode = 500;
  let message = "Something Went Wrong!!";

  console.log(err, "global error handler");
  if (err.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
  }
  else if (err.name === "CastError") {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
  }
  else if (err.name === "ZodError") {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  }
  else if (err.name === "ValidationError") {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  }
  else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  }
  else if (err instanceof Error) {
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};