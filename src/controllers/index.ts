import IController from "../interfaces/controller.interface";
import PostController from "./post.controller";
import AuthenticationController from "./auth.controller";
import UserController from "./user.controller";

// Initialize all available controllers controllers
const postController = new PostController();
const authenticationController = new AuthenticationController();
const userController = new UserController();

// Add controllers to the list of controllers
const controllers: IController[] = [postController, authenticationController, userController];

export default controllers;
