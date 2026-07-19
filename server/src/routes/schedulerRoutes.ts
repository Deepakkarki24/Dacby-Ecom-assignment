import { Router } from "express";
import { runScheduler } from "../scheduler/SchedulerSecurity.js";


const router = Router();

router.post("/run", runScheduler);

export default router;