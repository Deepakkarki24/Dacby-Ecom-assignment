import END_POINTS from "./endPoints";
import MakeRequest from "./makeRequest";
import type { Order, OrderStatus } from "@/types/order";

export interface CreateOrderPayload {
  customerName: string;
  phoneNumber: string;
  productName: string;
  price: string;
}

export const fetchOrders = (status?: OrderStatus | "") => {
  const params = status ? { status } : undefined;
  const url = END_POINTS.ORDER.FETCH
  return MakeRequest.get<Order[]>(url, params);
}

export const createOrder = (payload: CreateOrderPayload) => {
  const url = END_POINTS.ORDER.CREATE

  return MakeRequest.post<Order>(url, {
    customerName: payload.customerName,
    phoneNumber: payload.phoneNumber,
    productName: payload.productName,
    price: payload.price,
  });
}
