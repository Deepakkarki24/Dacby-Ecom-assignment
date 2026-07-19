import type { Order } from "@/types/order";
import StatusBadge from "@/components/orders/StatusBadge";
import type React from "react";
import { formatCurrency, formatDateTime } from "@/utils/utils";

interface OrdersTableProps {
  orders: Order[];
}

const OrdersTable: React.FC<OrdersTableProps> = ({ orders }) => {
  return (
    <div className="overflow-x-auto rounded-xl border border-white/10 bg-white/2">
      <table className="min-w-full divide-y divide-white/10 text-left text-sm">
        <thead className="bg-white/4">
          <tr>
            <th className="px-4 py-3 font-medium text-gray-300">Order ID</th>
            <th className="px-4 py-3 font-medium text-gray-300">Customer</th>
            <th className="px-4 py-3 font-medium text-gray-300">Phone</th>
            <th className="px-4 py-3 font-medium text-gray-300">Product</th>
            <th className="px-4 py-3 font-medium text-gray-300">Price</th>
            <th className="px-4 py-3 font-medium text-gray-300">Amount</th>
            <th className="px-4 py-3 font-medium text-gray-300">Status</th>
            <th className="px-4 py-3 font-medium text-gray-300">Payment</th>
            <th className="px-4 py-3 font-medium text-gray-300">Created</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {orders.map((order) => (
            <tr
              key={order._id}
              className="transition-colors hover:bg-white/3"
            >
              <td className="px-4 py-3 font-mono text-xs text-emerald-300">
                {order.orderId.slice(0, 12)}
              </td>
              <td className="px-4 py-3 text-gray-100">{order.customerName}</td>
              <td className="px-4 py-3 text-gray-400">{order.phoneNumber}</td>
              <td className="px-4 py-3 text-gray-100">{order.productName}</td>
              <td className="px-4 py-3 font-medium text-gray-100">
                {formatCurrency(order.price)}
              </td>
              <td className="px-4 py-3 font-medium text-gray-100">
                {order.amount}
              </td>
              <td className="px-4 py-3">
                <StatusBadge status={order.orderStatus} variant="order" />
              </td>
              <td className="px-4 py-3">
                <StatusBadge status={order.paymentStatus} variant="payment" />
              </td>
              <td className="px-4 py-3 text-xs whitespace-nowrap text-gray-400">
                {formatDateTime(order.createdAt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrdersTable;