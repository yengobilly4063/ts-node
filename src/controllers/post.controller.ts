import { Router, Request, Response } from "express";
import IPost from "../interfaces/post.interface";

class PostController {
  public path = "/posts";
  public router = Router();

  public posts: IPost[] = [
    {
      id: 1,
      author: "Bill Yengo",
      title: "Some random post",
      context: "Some random content",
    },
    {
      id: 2,
      author: "James Bond",
      title: "Some random post two",
      context: "Some random content two",
    },
  ];

  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    // Inject route specific middlewares e.g  auth or permision middlewares
    this.router.get(`${this.path}`, this.getAllPosts);
    this.router.post(`${this.path}`, this.createPost);
  }

  // Have to be arrow functions to access the class this
  private getAllPosts = (request: Request, response: Response) => {
    response.send(this.posts);
  };

  private createPost = (request: Request, response: Response) => {
    console.log("route hit");
    const newPost: IPost = {
      id: this.posts.length + 1,
      ...request.body,
    };
    this.posts.push(newPost);
    response.send(newPost);
  };
}

export default PostController;
