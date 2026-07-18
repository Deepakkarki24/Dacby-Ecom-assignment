import { type Request, type Response } from "express";
import { v4 as uuidv4 } from 'uuid';
import { errorResponse, successResponse } from "../utils/apiResponse.js";
import { Order } from "../models/orderModel.js";


export const createOrder = async (req: Request, res: Response) => {
    try {

        const { customerName, phoneNumber, productName, amount } = req.body

        if (!customerName || !phoneNumber || !productName) {
            return errorResponse(
                res,
                401,
                "Required field cannot be empty!"
            )
        }

        const ORDERIDALIAS = "ORD"
        const IdCode = uuidv4()

        const ORDER_ID = `${ORDERIDALIAS}-${IdCode}`

        const createdOrder = await Order.create({
            orderId: ORDER_ID,
            customerName,
            phoneNumber,
            productName,
            amount,
        })

        if (!createdOrder) {
            return errorResponse(
                res,
                501,
                "Error while placing the order, please try again after sometime!"
            )
        }

        return successResponse(
            res,
            200,
            "Order placed successfully!",
            createdOrder
        )

    } catch (err) {
        return errorResponse(res, 500, (err as any).message)
    }

}

export const getOrders = async (req: Request, res: Response) => {
    try {
        const { status } = req.query;

        const filter: Record<string, any> = {};

        if (status) {
            filter.orderStatus = status;
        }

        const orders = await Order.find(filter).sort({ createdAt: -1 });

        return successResponse(
            res,
            200,
            "Orders fetched successfully.",
            orders
        );
    } catch (err) {
        return errorResponse(res, 500, (err as Error).message);
    }
};

export const getOrder = async (req: Request, res: Response) => {
    try {

        const { id } = req.query

        if (!id) {
            return errorResponse(res, 401, "Order id not found!")
        }

        const order = await Order.findOne({ orderId: id as string })

        if (!order) {
            return errorResponse(res, 404, "Unable to find product, please try again later!")
        }

        return successResponse(res,
            200,
            "Order is fetched successfully!",
            order
        )

    } catch (err) {
        return errorResponse(res, 500, (err as any).message)
    }
} 