import HttpException from "./HttpException";

class NotAuthorizedException extends HttpException {
  constructor() {
    super(401, "Not Authorized");
  }
}

export default NotAuthorizedException;
