import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { CreateUserDto, UserLoginDto } from "../dtos/users.dto";
import UserModel from "../db/models/user.model";
import UserWithEmailAlreadyExistsException from "../exceptions/UserWithEmailAlreadyExistsException";
import WrongUserCredentialsException from "../exceptions/WrongUserCredentialsException";
import JwtTokenService from "./jwtToken.service";
import IUser from "../interfaces/user.interface";

class UserService {
  private userModel = UserModel;
  private jwtTokenService = new JwtTokenService();

  public registerUser = async (request: Request, response: Response, next: NextFunction) => {
    const userData: CreateUserDto = request.body;

    const registeredUser = await this.userModel.findOne({
      email: userData.email,
    });

    if (registeredUser) {
      return next(new UserWithEmailAlreadyExistsException(userData.email));
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await this.userModel.create({
      ...userData,
      password: hashedPassword,
    });

    user.password = "";

    this.createAndSetAuthCookie(user, response);
    response.send(user);
  };

  public logInUser = async (request: Request, response: Response, next: NextFunction) => {
    const userLoginData: UserLoginDto = request.body;
    const user = await this.userModel.findOne({ email: userLoginData.email });

    if (!user) {
      return next(new WrongUserCredentialsException());
    }

    const isPasswordMatching = await bcrypt.compare(userLoginData.password, user.password);

    if (!isPasswordMatching) {
      return next(new WrongUserCredentialsException());
    }

    user.password = "";
    this.createAndSetAuthCookie(user, response);
    response.send(user);
  };

  public loggingOut = (request: Request, response: Response, next: NextFunction) => {
    response.clearCookie("Authorization");
    response.sendStatus(200);
  };

  private createAndSetAuthCookie(user: IUser, response: Response) {
    const tokenData = this.jwtTokenService.createToken(user);

    response.cookie("Authorization", tokenData);
  }
}

export default UserService;
