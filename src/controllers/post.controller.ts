import { Router } from "express";
import { createPost, getAllPosts, getPostById, deletePost, modifyPost } from "../services/post.service";
import IController from "../interfaces/controller.interface";
import validationMiddleware from "../middlewares/validation.middleware";
import CreatePostDto from "../dtos/posts.dto";
import authMiddleware from "../middlewares/auth.middleware";

class PostController implements IController {
  public path = "/posts";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    // Inject route specific middlewares e.g  auth or permision middlewares
    this.router.get(`${this.path}`, getAllPosts);
    this.router.get(`${this.path}/:id`, getPostById);

    // apply authMiddleware to route chanin handlers
    this.router
      .all(`${this.path}/*`, authMiddleware)
      .post(`${this.path}`, validationMiddleware(CreatePostDto, true), createPost)
      .patch(`${this.path}/:id`, validationMiddleware(CreatePostDto, true), modifyPost)
      .delete(`${this.path}/:id`, deletePost);
  }
}

export default PostController;
