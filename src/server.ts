import dotenv from "dotenv";
import App from "./app";
import controllers from "./controllers";

dotenv.config();
const port = parseInt(process.env.PORT as string) || 3000;

const app = new App(controllers, port);

app.listen();
