import { NextFunction, Request, Response } from "express";
import UserModel from "../db/models/user.model";

class ReportService {
  private userModel = UserModel;
  public generateReport = async (request: Request, response: Response, next: NextFunction) => {
    //

    const usersByCountries = await this.userModel.aggregate([
      {
        $match: {
          "address.country": {
            $exists: true,
          },
        },
      },
      {
        $group: {
          _id: {
            country: "$address.country",
          },
          users: {
            $push: {
              name: "$name",
              _id: "$_id",
            },
          },
          count: {
            $sum: 1,
          },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "users._id",
          foreignField: "_id",
          as: "users",
        },
      },
      {
        $addFields: {
          amountOfArticles: {
            $size: "$articles",
          },
        },
      },
      {
        $sort: {
          amountOfArticles: 1,
        },
      },
    ]);

    response.send({ usersByCountries });
  };
}

export default ReportService;
