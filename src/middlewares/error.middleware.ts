import { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/HttpException";

export function errorMiddleware(
  error: HttpException,
  _: Request,
  response: Response,
  __: NextFunction
) {
  const status = error.status || 500;
  const message = error.message || "Something went wrong";
  response.status(status).json({ status, message });
}

export function notFoundMiddleware(
  request: Request,
  _: Response,
  next: NextFunction
) {
  const error = new HttpException(
    404,
    `Page -${request.originalUrl}- Not Found`
  );
  next(error);
}
