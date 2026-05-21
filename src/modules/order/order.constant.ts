export const ORDER_STATUS = {
  PENDING: "pending",
  PAID: "paid",
  CANCELLED: "cancelled",
  FAILED: "failed",
  REJECTED: "rejected",
} as const;
export type OrderStatus =
  typeof ORDER_STATUS[keyof typeof ORDER_STATUS];