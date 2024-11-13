import dotenv from "dotenv";
dotenv.config();

export default {
  PORT: parseInt(process.env.PORT as string) || 3000,
  MONGODB_URI: process.env.MONGODB_URI,
  NODE_ENV: process.env.NODE_ENV,
  JWT_SECRET: process.env.JWT_SECRET,
} as const;
