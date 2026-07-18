"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrder = void 0;
const uuid_1 = require("uuid");
const apiResponse_js_1 = require("../utils/apiResponse.js");
const orderModel_js_1 = require("../models/orderModel.js");
const createOrder = async (req, res) => {
    const { customerName, phoneNumber, productName, amount } = req.body;
    if (!customerName || !phoneNumber || !productName) {
        return (0, apiResponse_js_1.errorResponse)(res, 401, "Required field cannot be empty!");
    }
    const ORDERIDALIAS = "ORD";
    const IdCode = (0, uuid_1.v4)();
    const ORDER_ID = `${ORDERIDALIAS}-${IdCode}`;
    const createdOrder = await orderModel_js_1.Order.create({
        orderId: ORDER_ID,
        customerName,
        phoneNumber,
        productName,
        amount,
    });
    if (!createdOrder) {
        return (0, apiResponse_js_1.errorResponse)(res, 501, "Error while placing the order, please try again after sometime!");
    }
    return (0, apiResponse_js_1.successResponse)(res, 200, "Order placed successfully!", createdOrder);
};
exports.createOrder = createOrder;
