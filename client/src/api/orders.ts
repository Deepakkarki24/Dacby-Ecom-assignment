import { apiFetch } from "./client";
import type { Order, OrderStatus } from "../types/order";

export interface CreateOrderPayload {
  customerName: string;
  phoneNumber: string;
  productName: string;
  amount: string;
  price: string;
}

export async function fetchOrders(status?: OrderStatus | ""): Promise<Order[]> {
  const query = status ? `?status=${encodeURIComponent(status)}` : "";
  return apiFetch<Order[]>(`/api/order/get-orders${query}`);
}

export async function createOrder(payload: CreateOrderPayload): Promise<Order> {
  const quantity = Number(payload.amount);
  const unitPrice = Number(payload.price);

  return apiFetch<Order>("/api/order/create", {
    method: "POST",
    body: JSON.stringify({
      customerName: payload.customerName,
      phoneNumber: payload.phoneNumber,
      productName: payload.productName,
      amount: quantity * unitPrice,
    }),
  });
}
