import React, { useState } from "react";
import { useOrders } from "@/hooks/useOrders";
import { formatDateTime } from "@/utils/utils";
import {
  ORDER_STATUS_OPTIONS,
  type OrderStatus,
} from "@/types/order";
import OrdersTable from "@/components/orders/OrdersTable";
import CreateOrderModal from "@/components/orders/CreateOrderModal";
import {
  EmptyState,
  ErrorState,
  LoadingState,
} from "@/components/orders/OrderStates";
import { XIcon } from "@phosphor-icons/react";
import { runScheduler } from "@/apiManager/scheduler";
import { ApiError } from "@/apiManager/apiError";


const OrdersDashboard: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "">("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createMessage, setCreateMessage] = useState<string | null>(null);
  const [schedulerLoading, setSchedulerLoading] = useState(false);
  const [schedulerMessage, setSchedulerMessage] = useState<string | null>(null);
  const [schedulerError, setSchedulerError] = useState<string | null>(null);

  const { orders, loading, error, refresh, lastUpdated } = useOrders({
    statusFilter
  });
  const selectedStatusLabel =
    ORDER_STATUS_OPTIONS.find((option) => option.value === statusFilter)
      ?.label ?? "All Statuses";

  const handleRunScheduler = async () => {
    setSchedulerLoading(true);
    setSchedulerMessage(null);
    setSchedulerError(null);

    try {
      const result = await runScheduler();
      setSchedulerMessage(
        `Scheduler ran successfully - checked ${result.ordersChecked} order(s), updated ${result.ordersUpdated}.`,
      );
      await refresh();
    } catch (err) {
      const message =
        err instanceof ApiError
          ? err.message
          : "Failed to run scheduler. Please try again.";
      setSchedulerError(message);
    } finally {
      setSchedulerLoading(false);
    }
  };

  const showTable = !loading && !error && orders.length > 0;
  const showEmpty = !loading && !error && orders.length === 0;

  return (
    <div className="dashboard w-full px-4 py-8 sm:px-6">
      <header className="mb-8 flex flex-col gap-4 text-left sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-wider text-emerald-400">
            Admin
          </p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-gray-50 sm:text-4xl">
            Orders Dashboard
          </h1>
        </div>

        <button
          type="button"
          onClick={() => setIsCreateModalOpen(true)}
          className="inline-flex shrink-0 items-center gap-2 self-start rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-400"
        >
          + Create Order
        </button>
      </header>

      <div className="mb-6 flex flex-col gap-4 rounded-xl border border-white/10 bg-white/3 p-4 sm:flex-row sm:flex-wrap sm:items-end">
        <div className="flex min-w-45 flex-1 flex-col gap-1.5 text-left">
          <label
            htmlFor="status-filter"
            className="text-xs font-medium uppercase tracking-wide text-gray-400"
          >
            Status filter
          </label>
          <select
            id="status-filter"
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value as OrderStatus | "")
            }
            className="rounded-lg border border-white/10 bg-[#1e1f26] px-3 py-2.5 text-sm text-gray-100 outline-none transition focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20"
          >
            {ORDER_STATUS_OPTIONS.map((option) => (
              <option key={option.value || "all"} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => refresh()}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-500/15 px-4 py-2.5 text-sm font-medium text-emerald-300 ring-1 ring-emerald-500/30 transition hover:bg-emerald-500/25 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span className={loading ? "animate-spin" : ""}>↻</span>
            Refresh
          </button>

          <button
            type="button"
            onClick={handleRunScheduler}
            disabled={schedulerLoading}
            className="inline-flex items-center gap-2 rounded-lg bg-violet-500/15 px-4 py-2.5 text-sm font-medium text-violet-300 ring-1 ring-violet-500/30 transition hover:bg-violet-500/25 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {schedulerLoading ? (
              <>
                <span className="animate-spin">↻</span>
                Running...
              </>
            ) : (
              <>Run Scheduler</>
            )}
          </button>
        </div>
      </div>

      {lastUpdated && (
        <p className="pb-2 text-left text-xs text-gray-500">
          Last updated: {formatDateTime(lastUpdated)}
        </p>
      )}

      {createMessage && (
        <div className="mb-4 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-left text-sm text-emerald-200">
          {createMessage}
        </div>
      )}

      {schedulerMessage && (
        <div className="relative mb-4 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 pr-10 text-left text-sm text-emerald-200">
          {schedulerMessage}
          <button
            type="button"
            onClick={() => setSchedulerMessage(null)}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-emerald-200/80 transition hover:bg-emerald-500/20 hover:text-emerald-100"
            aria-label="Dismiss message"
          >
            <XIcon size={14} />
          </button>
        </div>
      )}

      {schedulerError && (
        <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-left text-sm text-red-200">
          {schedulerError}
        </div>
      )}

      {loading && <LoadingState />}
      {error && !loading && <ErrorState message={error} onRetry={refresh} />}
      {showEmpty && <EmptyState statusLabel={selectedStatusLabel} />}
      {showTable && <OrdersTable orders={orders} />}

      <CreateOrderModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={() => {
          setCreateMessage("Order created successfully!");
          refresh();
        }}
      />
    </div>
  );
}

export default OrdersDashboard;