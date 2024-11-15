import IController from "../interfaces/controller.interface";
import PostController from "./post.controller";
import AuthenticationController from "./auth.controller";
import UserController from "./user.controller";
import ReportController from "./report.controller";

// Initialize all available controllers controllers
const postController = new PostController();
const authenticationController = new AuthenticationController();
const userController = new UserController();
const reportController = new ReportController();

// Add controllers to the list of controllers
const controllers: IController[] = [postController, authenticationController, userController, reportController];

export default controllers;
