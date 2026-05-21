import { Types } from "mongoose";

/* =======================
   Single Cart Item
======================= */
export type TCartItem = {
  _id?: Types.ObjectId;          // optional for new items
  productId: Types.ObjectId;
  quantity: number;
};

/* =======================
   Cart Document
======================= */
export type TCart = {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  items: TCartItem[];
  createdAt: Date;
  updatedAt: Date;
};
