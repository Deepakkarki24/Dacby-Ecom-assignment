import END_POINTS from "./endPoints";
import MakeRequest from "./makeRequest";
import { ApiError } from "./apiError";
import { VITE_SCHEDULER_SECRET } from "@/config/env";
import type { SchedulerResult } from "@/types/order";

export function runScheduler(): Promise<SchedulerResult> {
  if (!VITE_SCHEDULER_SECRET) {
    throw new ApiError(
      "Scheduler secret is not configured. Set VITE_SCHEDULER_SECRET in client/.env",
    );
  }

  return MakeRequest.post<SchedulerResult>(
    END_POINTS.SCHEDULER.RUN,
    {},
    { "x-secret-key": VITE_SCHEDULER_SECRET },
  );
}
