import App from "./app";
import controllers from "./controllers";
import _env from "./env";

const app = new App(controllers, _env.PORT);

app.listen();
