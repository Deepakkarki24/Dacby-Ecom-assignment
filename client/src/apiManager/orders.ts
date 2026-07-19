import END_POINTS from "./endPoints";
import MakeRequest from "./makeRequest";
import type { Order, OrderStatus } from "@/types/order";

export interface CreateOrderPayload {
  customerName: string;
  phoneNumber: string;
  productName: string;
  quantity: string;
  price: string;
}

export function fetchOrders(status?: OrderStatus | ""): Promise<Order[]> {
  const params = status ? { status } : undefined;
  return MakeRequest.get<Order[]>(END_POINTS.ORDER.FETCH, params);
}

export function createOrder(payload: CreateOrderPayload): Promise<Order> {
  const quantity = Number(payload.quantity);
  const unitPrice = Number(payload.price);

  return MakeRequest.post<Order>(END_POINTS.ORDER.CREATE, {
    customerName: payload.customerName,
    phoneNumber: payload.phoneNumber,
    productName: payload.productName,
    amount: quantity * unitPrice,
  });
}
