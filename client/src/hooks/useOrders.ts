import { ApiError } from "@/apiManager/apiError";
import { fetchOrders } from "@/apiManager/orders";
import type { Order, OrderStatus } from "@/types/order";
import { useCallback, useEffect, useRef, useState } from "react";

interface UseOrdersOptions {
  statusFilter: OrderStatus | "";
}

interface UseOrdersResult {
  orders: Order[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  lastUpdated: Date | null;
}

export const useOrders = ({
  statusFilter,
}: UseOrdersOptions): UseOrdersResult => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const isMounted = useRef(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchOrders(statusFilter);

      if (isMounted.current) {
        setOrders(data ?? []);
        setLastUpdated(new Date());
      }
    } catch (err) {
      if (isMounted.current) {
        const message =
          err instanceof ApiError
            ? err.message
            : "Failed to load orders. Please try again.";
        setError(message);
      }
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  }, [statusFilter]);

  useEffect(() => {
    isMounted.current = true;
    refresh();

    return () => {
      isMounted.current = false;
    };
  }, [refresh]);

  return { orders, loading, error, refresh, lastUpdated };
}
