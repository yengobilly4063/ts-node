import mongoose, { Schema, Document } from "mongoose";
import IPost from "../../interfaces/post.interface";

const postSchema = new Schema({
  author: { type: String, require: true },
  authorId: { type: String, require: true },
  content: { type: String, require: true },
  title: { type: String, require: true },
});

const PostModel = mongoose.model<IPost & Document>("post", postSchema);

export default PostModel;
