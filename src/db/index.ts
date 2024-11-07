import _env from "../env";
import mongoose from "mongoose";

function initializeDatabaseConnection() {
  return mongoose.connect(process.env.MONGODB_URI as string);
}

export default initializeDatabaseConnection;
