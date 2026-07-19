import type React from "react";

interface LoadingStateProps {
  message?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ message = "Loading orders..." }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-white/10 bg-white/2 px-6 py-16">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-emerald-400/30 border-t-emerald-400" />
      <p className="text-sm text-gray-400">{message}</p>
    </div>
  );
}

interface EmptyStateProps {
  statusLabel: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ statusLabel }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-white/15 bg-white/2 px-6 py-16">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-2xl">
        📦
      </div>
      <h3 className="text-lg font-medium text-gray-100">No orders found</h3>
      <p className="max-w-sm text-sm text-gray-400">
        {statusLabel === "All Statuses"
          ? "There are no orders yet. Use Create Order to add one."
          : `No orders with status "${statusLabel}" right now.`}
      </p>
    </div>
  );
}

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-red-500/30 bg-red-500/10 px-6 py-12">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/20 text-xl">
        ⚠
      </div>
      <div className="text-center">
        <h3 className="text-lg font-medium text-red-200">Something went wrong</h3>
        <p className="mt-1 max-w-md text-sm text-red-300/80">{message}</p>
      </div>
      <button
        type="button"
        onClick={onRetry}
        className="rounded-lg bg-red-500/20 px-4 py-2 text-sm font-medium text-red-200 ring-1 ring-red-500/40 transition hover:bg-red-500/30"
      >
        Try again
      </button>
    </div>
  );
}