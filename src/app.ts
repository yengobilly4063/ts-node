import express, { Application } from "express";
import loggerMiddleware from "./middlewares/logger";
import dotenv from "dotenv";
import validateEnv from "./utils/validateEnv";
import initializeDatabaseConnection from "./db";

class App {
  private app: Application;
  private port: number;

  constructor(controllers: any[], port: number = 5000) {
    this.app = express();
    this.port = port;
    this.initializeEnv();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }

  // Initialize all needed and global middlewares here
  private initializeMiddlewares() {
    this.app.use(loggerMiddleware);
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  private initializeControllers(controllers: any[]) {
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });
  }

  private initializeEnv() {
    dotenv.config();
    validateEnv();
  }

  public listen() {
    initializeDatabaseConnection()
      .then(() => {
        this.app.listen(this.port, () => {
          console.log(
            `[Server]: Server is running at http://localhost:${this.port}`
          );
        });
      })
      .catch((error) => {
        console.log(`Error: ${error.message}`);
      });
  }
}

export default App;
