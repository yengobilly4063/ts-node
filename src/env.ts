// Initialize and export all .env keys needed in this project
const _env = {
  PORT: parseInt(process.env.PORT as string) || 3000,
  MONGODB_URI: process.env.MONGODB_URI as string,
  NODE_ENV: process.env.NODE_ENV,
};

// export default _env;

export default {
  PORT: parseInt(process.env.PORT as string) || 3000,
  MONGODB_URI: process.env.MONGODB_URI,
  NODE_ENV: process.env.NODE_ENV,
} as const;
