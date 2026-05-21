import mongoose, { Schema } from "mongoose";
import { ORDER_STATUS } from "./order.constant";

const orderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: Object.values(ORDER_STATUS),
    },

    cartId: {
      type: Schema.Types.ObjectId,
      ref: "Cart",
      required: true,
    },

    totalPrice: {
      type: Number,
      min: 0,
    },

    paymentId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Order = mongoose.model("Order", orderSchema);
