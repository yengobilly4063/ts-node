import HttpException from "./HttpException";

class UserWithEmailAlreadyExistsException extends HttpException {
  constructor(email: string) {
    super(409, `User with email ${email} already exists`);
  }
}

export default UserWithEmailAlreadyExistsException;
