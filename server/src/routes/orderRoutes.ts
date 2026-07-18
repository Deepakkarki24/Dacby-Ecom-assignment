import { Router } from "express";
import { createOrder, getOrder, getOrders } from "../controller/orderController.js";

const router = Router()

router.post("/create", createOrder)
router.get("/get-orders", getOrders)
router.get("/get-order", getOrder)

export default router
