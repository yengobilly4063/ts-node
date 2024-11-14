import IPost from "./post.interface";

interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  posts: string[];
}

export default IUser;
