import express, { Application, Request, Response, NextFunction } from "express";
import loggerMiddleware from "./middlewares/logger";
import dotenv from "dotenv";
import validateEnv from "./utils/validateEnv";
import initializeDatabaseConnection from "./db";
import IController from "./interfaces/controller.interface";
import {
  errorMiddleware,
  notFoundMiddleware,
} from "./middlewares/error.middleware";

class App {
  private app: Application;
  private port: number;

  constructor(controllers: any[], port: number = 5000) {
    this.app = express();
    this.port = port;
    this.initializeEnv();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
  }

  // Initialize all needed and global middlewares here
  private initializeMiddlewares() {
    this.app.use(loggerMiddleware);
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  private initializeControllers(controllers: IController[]) {
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });
  }

  private initializeErrorHandling() {
    this.app.use(notFoundMiddleware);
    this.app.use(errorMiddleware);
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
