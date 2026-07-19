import type { Request, Response } from "express";
import { SCHEDULER_SECRET } from "../config/env.js";
import { runOrderScheduler } from "../cron/orderScheduler.js";
import { errorResponse, successResponse } from "../utils/apiResponse.js";

export const runScheduler = async (req: Request, res: Response) => {
    try {
        const secret = req.headers["x-secret-key"];

        if (secret !== SCHEDULER_SECRET) {
            return errorResponse(res, 401, "Unauthorized access!")
        }

        const result = await runOrderScheduler();

        return successResponse(res, 200, "logs fetched successfull!", result)

    } catch (err) {
        return errorResponse(res, 500, (err as any).message)
    }
}