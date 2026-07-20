import END_POINTS from "./endPoints";
import MakeRequest from "./makeRequest";
import { ApiError } from "./apiError";
import { VITE_SCHEDULER_SECRET } from "@/config/env";
import type { SchedulerResult } from "@/types/order";

export const runScheduler = async () => {
  if (!VITE_SCHEDULER_SECRET) {
    throw new ApiError(
      "Scheduler secret is not configured. Set VITE_SCHEDULER_SECRET in client/.env",
    );
  }

  const url = END_POINTS.SCHEDULER.RUN
  return MakeRequest.post<SchedulerResult>(url, {}, { "x-secret-key": VITE_SCHEDULER_SECRET },
  );
}
