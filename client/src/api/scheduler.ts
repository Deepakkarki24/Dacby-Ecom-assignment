import { ApiError, apiFetch } from "./client";
import type { SchedulerResult } from "../types/order";
import { VITE_SCHEDULER_SECRET } from "../config/env";

export async function runScheduler(): Promise<SchedulerResult> {
  const secret = VITE_SCHEDULER_SECRET;
  console.log("secret", secret)

  if (!secret) {
    throw new ApiError(
      "Scheduler secret is not configured. Set VITE_SCHEDULER_SECRET in client/.env",
    );
  }

  return apiFetch<SchedulerResult>("/api/scheduler/run", {
    method: "POST",
    headers: {
      "x-secret-key": secret,
    },
  });
}
