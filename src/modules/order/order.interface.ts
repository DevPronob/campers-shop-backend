import { OrderStatus } from "./order.constant";

export interface IOrder {
  _id?: string;
  userId: string;
  status: OrderStatus;
  cartId: string;        // single cart reference
  paymentId?: string;
}
