import { Document, Types } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface IUser {
  name: string;
  email: string;
  password: string;
  address: string;
  phone: string;
  role?: typeof USER_ROLE | string;
  payment?: Types.ObjectId | null;
}

// Document = one user instance
export interface IUserDocument extends IUser, Document {
     _id?: Types.ObjectId;
  comparePassword(password: string): Promise<boolean>;
}
