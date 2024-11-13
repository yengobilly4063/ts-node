import { NextFunction, Response } from "express";
import RequestWithUser from "../interfaces/requestWithUser.interface";
import UserModel from "../db/models/user.model";
import _env from "../env";
import WrongAuthenticationTokenException from "../exceptions/WrongAuthenticationTokenException";
import AuthenticationTokenMissingException from "../exceptions/AuthenticationTokenMissingException";
import JwtTokenService from "../services/jwtToken.service";

async function authMiddleware(request: RequestWithUser, response: Response, next: NextFunction) {
  const cookies = request.cookies;
  const jwtTokenService = new JwtTokenService();

  if (cookies && cookies.Authorization) {
    const cookie = cookies.Authorization.token;
    const jwtSecret: string = _env.JWT_SECRET!;

    try {
      const verificationResponse = jwtTokenService.verifyAuthorizationCookie(cookie, jwtSecret);
      const id = verificationResponse._id;
      const user = await UserModel.findById(id);

      if (!user) {
        return next(new WrongAuthenticationTokenException());
      }

      request.user = user;
      next();
    } catch (error) {
      next(new WrongAuthenticationTokenException());
    }
  } else {
    next(new AuthenticationTokenMissingException());
  }
}

export default authMiddleware;
