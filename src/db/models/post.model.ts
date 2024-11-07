import mongoose, { Schema, Document } from "mongoose";
import IPost from "../../interfaces/post.interface";

const postSchema = new Schema({
  author: String,
  content: String,
  title: String,
});

const PostModel = mongoose.model<IPost & Document>("post", postSchema);

export default PostModel;
