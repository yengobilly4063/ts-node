import IController from "../interfaces/controller.interface";
import PostController from "./post.controller";

// Initialize all available controllers controllers
const postController = new PostController();

// Add controllers to the list of controllers
const controllers: IController[] = [postController];

export default controllers;
