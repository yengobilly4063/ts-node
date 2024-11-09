import mongoose, { Schema, Document } from "mongoose";
import IUser from "../../interfaces/user.interface";

const userSchema = new Schema({
  name: { type: String, required: String },
  email: { type: String, required: String },
  password: { type: String, required: String },
});

const UserModel = mongoose.model<IUser & Document>("User", userSchema);

export default UserModel;
