import { Router } from "express";
import IController from "../interfaces/controller.interface";
import ReportService from "../services/report.service";

class ReportController implements IController {
  public path = "/report";
  public router = Router();
  private reportService = new ReportService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.reportService.generateReport);
  }
}

export default ReportController;
