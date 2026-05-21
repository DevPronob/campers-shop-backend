import { Order } from "./order.model";
import { Cart } from "../cart/cart.model";
import { ORDER_STATUS, OrderStatus } from "./order.constant";
import mongoose from "mongoose";

interface CreateOrderPayload {
  userId: string;
  cartId: string;
  paymentId?: string;
  status?: OrderStatus;
  totalPrice?: number;

}

const createOrder = async (payload: CreateOrderPayload) => {
  console.log(payload,"payload in createOrder")
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const cart = await Cart.findById(payload.cartId).session(session);

    if (!cart) {
      throw new Error("Cart not found");
    }

    const order = await Order.create(
      [
        {
          userId: payload.userId,
          cartId: cart._id,
          paymentId: payload.paymentId,
          status: payload.status ? ORDER_STATUS.PAID : ORDER_STATUS.PENDING,
          totalPrice: payload.totalPrice || 0,
        },
      ],
      { session }
    );

  
    await Cart.findByIdAndDelete(cart._id).session(session);

    await session.commitTransaction();
    session.endSession();

    return order[0];
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const getOrderById = async (orderId: string, userId: string) => {
  const order = await Order.findById(orderId).populate("cartId");

  if (!order) {
    throw new Error("Order not found");
  }

  if (order.userId.toString() !== userId) {
    throw new Error("Unauthorized access");
  }

  return order;
};

const getUserOrders = async (userId: string) => {
  return Order.find({ userId }).sort({ createdAt: -1 });
};

const updateOrderStatus = async (
  orderId: string,
  status: OrderStatus
) => {
  const order = await Order.findById(orderId);

  if (!order) {
    throw new Error("Order not found");
  }

  if (!order.status) {
    throw new Error("Order status is invalid");
  }

  // 🔒 Status transition rules
  const validTransitions: Record<OrderStatus, OrderStatus[]> = {
    pending: ["paid", "failed", "cancelled"],
    paid: ["rejected"],
    failed: [],
    cancelled: [],
    rejected: [],
  };

  if (!validTransitions[order.status].includes(status)) {
    throw new Error(
      `Cannot change status from ${order.status} to ${status}`
    );
  }

  order.status = status;
  await order.save();

  return order;
};

const cancleOrder = async (orderId: string) => {
  const order = await Order.findById(orderId);
  if (!order) {
    throw new Error("Order not found");
  }
  order.status = ORDER_STATUS.CANCELLED;
  await order.save();
  return order;
};

const overviewOrder =async(userId:string) =>{
  const orders = await Order.find();
  const userOrder = await orders.filter(order => order.userId.toString() === userId);
  const totalOrder= userOrder.length;
const totalPrice =userOrder.reduce((acc,order) => acc + (order.totalPrice || 0), 0);
return {
  totalOrder,
  totalPrice
}

}
export const OrderService = {
  createOrder,
  getOrderById,
  getUserOrders,
  updateOrderStatus,
  cancleOrder,
  overviewOrder
};
