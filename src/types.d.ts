import "express";
import IUser from "./interfaces/user.interface";

declare module "express-serve-static-core" {
  export interface Request {
    user: IUser;
  }

  export interface Response {
    user: IUser;
  }
}

declare module "express" {
  interface Request {
    user?: IUser;
  }
}
