import { Request, Response } from "express";
import PostModel from "../db/models/post.model";
import IPost from "../interfaces/post.interface";

export async function createPost(request: Request, response: Response) {
  const postData: IPost = request.body;
  const createdPost = await new PostModel(postData).save();
  response.send(createdPost);
}

export async function getAllPosts(_: Request, response: Response) {
  const posts = await PostModel.find();
  response.send(posts);
}

export async function getPostById(request: Request, response: Response) {
  const { id } = request.params;
  const foundPost = await PostModel.findById(id);

  response.send(foundPost);
}

export async function modifyPost(request: Request, response: Response) {
  const { id } = request.params;
  const postData: IPost = request.body;

  const savedPost = await PostModel.findByIdAndUpdate(id, postData, {
    new: true,
  });

  response.send(savedPost);
}

export async function deletePost(request: Request, response: Response) {
  const { id } = request.params;
  const successResponse = await PostModel.findByIdAndDelete(id);

  if (!successResponse) {
    response.status(404).send({ msg: `Cound not delete post with id ${id}` });
    return;
  }

  response.status(200).send({ msg: `Post deleted successfully` });
}
