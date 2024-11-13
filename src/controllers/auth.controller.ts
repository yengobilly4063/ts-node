import express, { Router } from "express";
import IController from "../interfaces/controller.interface";
import UserService from "../services/user.service";
import validationMiddleware from "../middlewares/validation.middleware";
import { CreateUserDto, UserLoginDto } from "../dtos/users.dto";

class AuthenticationController implements IController {
  public path: string = "/auth";
  public router: Router = express.Router();
  private userService = new UserService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/logout`, this.userService.loggingOut);
    this.router.post(`${this.path}/register`, validationMiddleware(CreateUserDto), this.userService.registerUser);
    this.router.post(`${this.path}/login`, validationMiddleware(UserLoginDto), this.userService.logInUser);
  }
}

export default AuthenticationController;
