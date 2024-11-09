import HttpException from "./HttpException";

class WrongUserCredentialsException extends HttpException {
  constructor() {
    super(
      404,
      "User credentials error: Verify that your password/email is correct"
    );
  }
}
export default WrongUserCredentialsException;
