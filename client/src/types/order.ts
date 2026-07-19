export enum PaymentStatus {
  PAID = "PAID",
  PENDING = "PENDING",
}

export enum OrderStatus {
  PLACED = "PLACED",
  PROCESSING = "PROCESSING",
  READY_TO_SHIP = "READY_TO_SHIP",
}

export interface OrderStatusHistory {
  from: OrderStatus;
  to: OrderStatus;
  changedAt: string;
}

export interface Order {
  _id: string;
  orderId: string;
  customerName: string;
  phoneNumber: string;
  productName: string;
  amount: number;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  orderStatusHistory: OrderStatusHistory[];
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
  error?: unknown;
}

export interface SchedulerResult {
  success: boolean;
  ordersChecked: number;
  ordersUpdated: number;
}

export const ORDER_STATUS_OPTIONS = [
  { value: "", label: "All Statuses" },
  { value: OrderStatus.PLACED, label: "Placed" },
  { value: OrderStatus.PROCESSING, label: "Processing" },
  { value: OrderStatus.READY_TO_SHIP, label: "Ready to Ship" },
] as const;
