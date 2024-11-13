import HttpException from "./HttpException";

class WrongAuthenticationTokenException extends HttpException {
  constructor() {
    super(401, "Unauthorized: Wrong authentication");
  }
}

export default WrongAuthenticationTokenException;
