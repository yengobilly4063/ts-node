import HttpException from "./HttpException";

class AuthenticationTokenMissingException extends HttpException {
  constructor() {
    super(401, "Unauthorized: Missen tokens");
  }
}

export default AuthenticationTokenMissingException;
