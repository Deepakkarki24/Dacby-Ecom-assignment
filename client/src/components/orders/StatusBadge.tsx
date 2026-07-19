import type { OrderStatus, PaymentStatus } from "../../types/order";

const orderStatusStyles: Record<OrderStatus, string> = {
  PLACED: "bg-amber-500/15 text-amber-300 ring-amber-500/30",
  PROCESSING: "bg-blue-500/15 text-blue-300 ring-blue-500/30",
  READY_TO_SHIP: "bg-emerald-500/15 text-emerald-300 ring-emerald-500/30",
};

const paymentStatusStyles: Record<PaymentStatus, string> = {
  PAID: "bg-emerald-500/15 text-emerald-300 ring-emerald-500/30",
  PENDING: "bg-orange-500/15 text-orange-300 ring-orange-500/30",
};

function formatLabel(value: string): string {
  return value
    .split("_")
    .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
    .join(" ");
}

interface StatusBadgeProps {
  status: OrderStatus | PaymentStatus;
  variant: "order" | "payment";
}

export function StatusBadge({ status, variant }: StatusBadgeProps) {
  const styles =
    variant === "order"
      ? orderStatusStyles[status as OrderStatus]
      : paymentStatusStyles[status as PaymentStatus];

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${styles}`}
    >
      {formatLabel(status)}
    </span>
  );
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDateTime(value: string): string {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}
