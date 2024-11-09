import { Router } from "express";
import {
  createPost,
  getAllPosts,
  getPostById,
  deletePost,
  modifyPost,
} from "../services/post.service";
import IController from "../interfaces/controller.interface";
import validationMiddleware from "../middlewares/validation.middleware";
import CreatePostDto from "../dtos/posts.dto";

class PostController implements IController {
  public path = "/posts";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    // Inject route specific middlewares e.g  auth or permision middlewares
    this.router.get(`${this.path}`, getAllPosts);
    this.router.post(
      `${this.path}`,
      validationMiddleware(CreatePostDto),
      createPost
    );
    this.router.get(`${this.path}/:id`, getPostById);
    this.router.patch(
      `${this.path}/:id`,
      validationMiddleware(CreatePostDto, true),
      modifyPost
    );
    this.router.delete(`${this.path}/:id`, deletePost);
  }
}

export default PostController;
