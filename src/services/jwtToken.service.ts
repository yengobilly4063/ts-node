import _env from "../env";
import { IDataStoredInToken, ITokenData } from "../interfaces/token.interface";
import IUser from "../interfaces/user.interface";
import jwt from "jsonwebtoken";

class JwtTokenService {
  private expiresIn: number = 60 * 60; //an hour
  private jtwSecret: string = _env.JWT_SECRET!;

  public createToken = (user: IUser): ITokenData => {
    //
    const dataStoredInToken: IDataStoredInToken = {
      _id: user._id,
    };

    return {
      expiresIn: this.expiresIn,
      token: jwt.sign(dataStoredInToken, this.jtwSecret, {
        expiresIn: this.expiresIn,
      }),
    };
  };
}

export default JwtTokenService;
