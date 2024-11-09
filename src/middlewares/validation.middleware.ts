import { NextFunction, RequestHandler, Request, Response } from "express";
import { validate, ValidationError } from "class-validator";
import HttpException from "../exceptions/HttpException";
import { plainToInstance } from "class-transformer";

function validationMiddleware<T>(
  type: any,
  skipMissingProperties = false
): RequestHandler {
  return (req: Request, response: Response, next: NextFunction) => {
    validate(plainToInstance(type, req.body), { skipMissingProperties }).then(
      (errors: ValidationError[]) => {
        if (errors.length > 0) {
          const message = errors
            .map((error: ValidationError) => error.constraints)
            .map((err) => Object.values(err!))
            .flat()
            .join(", ");

          return next(new HttpException(400, message));
        } else {
          next();
        }
      }
    );
  };
}
export default validationMiddleware;
