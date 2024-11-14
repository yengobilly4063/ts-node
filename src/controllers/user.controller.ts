import { Router } from "express";
import IController from "../interfaces/controller.interface";
import UserService from "../services/user.service";
import authMiddleware from "../middlewares/auth.middleware";
class UserController implements IController {
  path = "/users";
  router = Router();
  private userService = new UserService();

  constructor() {
    this.initiateRoutes();
  }

  private initiateRoutes() {
    this.router.get(`${this.path}/:id/posts`, authMiddleware, this.userService.getAllUserPosts);
  }
}

export default UserController;
