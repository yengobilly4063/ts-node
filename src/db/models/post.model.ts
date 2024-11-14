import mongoose, { Schema, Document } from "mongoose";
import IPost from "../../interfaces/post.interface";

const postSchema = new Schema({
  authors: [
    {
      ref: "User",
      type: Schema.Types.ObjectId,
    },
  ],
  content: { type: String, require: true },
  title: { type: String, require: true },
});

const PostModel = mongoose.model<IPost & Document>("Post", postSchema);

export default PostModel;
