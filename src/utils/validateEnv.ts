import { cleanEnv, str, port } from "envalid";

function validateEnv() {
  cleanEnv(process.env, {
    MONGODB_URI: str(),
    PORT: port(),
    NODE_ENV: str({
      choices: ["development", "test", "production", "staging"],
    }),
  });
}

export default validateEnv;
