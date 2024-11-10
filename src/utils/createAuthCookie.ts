import { ITokenData } from "../interfaces/token.interface";

function createAuthCookie(tokenData: ITokenData) {
  return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
}

export default createAuthCookie;
