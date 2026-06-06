import { Types } from "mongoose";


export type TCartItem = {
  _id?: Types.ObjectId;
  productId: Types.ObjectId;
  quantity: number;
};


export type TCart = {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  items: TCartItem[];
  createdAt: Date;
  updatedAt: Date;
};
