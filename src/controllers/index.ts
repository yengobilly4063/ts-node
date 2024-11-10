import IController from "../interfaces/controller.interface";
import PostController from "./post.controller";
import AuthenticationController from "./auth.controller";

// Initialize all available controllers controllers
const postController = new PostController();
const authenticationController = new AuthenticationController();

// Add controllers to the list of controllers
const controllers: IController[] = [postController, authenticationController];

export default controllers;
