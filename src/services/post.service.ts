import { NextFunction, Request, Response } from "express";
import PostModel from "../db/models/post.model";
import IPost from "../interfaces/post.interface";
import PostNotFoundException from "../exceptions/PostNotFoundException";
import RequestWithUser from "../interfaces/requestWithUser.interface";
import UserModel from "../db/models/user.model";

export async function createPost(request: RequestWithUser, response: Response) {
  const postData: IPost = request.body;
  const createdPost = await new PostModel({ ...postData, authors: [request.user._id] }).save();

  const savedPost = await PostModel.findOne({ _id: createdPost._id }).populate("author", "-password").exec();

  response.send(savedPost);
}

export async function getAllPosts(_: Request, response: Response) {
  const posts = await PostModel.find().populate("author", "-password");
  response.send(posts);
}

export async function getPostById(request: Request, response: Response, next: NextFunction) {
  const { id } = request.params;
  const foundPost = await PostModel.findById(id);

  if (!foundPost) {
    return next(new PostNotFoundException(id));
  }

  response.send(foundPost);
}

export async function modifyPost(request: Request, response: Response, next: NextFunction) {
  const { id } = request.params;
  const postData: IPost = request.body;

  const savedPost = await PostModel.findByIdAndUpdate(id, postData, {
    new: true,
  });

  if (!savedPost) {
    return next(new PostNotFoundException(id));
  }

  response.send(savedPost);
}

export async function deletePost(request: Request, response: Response, next: NextFunction) {
  const { id } = request.params;
  const successResponse = await PostModel.findByIdAndDelete(id);

  if (!successResponse) {
    return next(new PostNotFoundException(id));
  }

  response.status(200).send({ msg: `Post deleted successfully` });
}
