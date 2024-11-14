import mongoose, { Schema, Document } from "mongoose";
import IUser from "../../interfaces/user.interface";

const addressSchema = new Schema({
  city: { type: String, require: true },
  street: { type: String, require: true },
});

const userSchema = new Schema({
  address: addressSchema,
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const UserModel = mongoose.model<IUser & Document>("User", userSchema);

export default UserModel;
