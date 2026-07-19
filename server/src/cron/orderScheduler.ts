import { Order, OrderStatus } from "../models/orderModel.js";
import { SchedulerLog, SchedulerStatus } from "../models/SchedulerLogModel.js";
import cron from "node-cron";

export const runOrderScheduler = async () => {
    const startedAt = new Date();

    let ordersChecked = 0;
    let ordersUpdated = 0;

    try {
        // Find all orders that can be update
        const orders = await Order.find({
            orderStatus: {
                $in: [OrderStatus.PLACED, OrderStatus.PROCESSING],
            },
        });

        ordersChecked = orders.length;

        for (const order of orders) {
            const now = new Date();

            const minutes =
                (now.getTime() - order.updatedAt.getTime()) / (1000 * 60);

            // PLACED -> PROCESSING
            if (
                order.orderStatus === OrderStatus.PLACED &&
                minutes >= 10
            ) {
                order.orderStatusHistory.push({
                    from: OrderStatus.PLACED,
                    to: OrderStatus.PROCESSING,
                    changedAt: new Date(),
                });

                order.orderStatus = OrderStatus.PROCESSING;

                await order.save();

                ordersUpdated++;
            }

            // PROCESSING -> READY_TO_SHIP
            else if (
                order.orderStatus === OrderStatus.PROCESSING &&
                minutes >= 20
            ) {
                order.orderStatusHistory.push({
                    from: OrderStatus.PROCESSING,
                    to: OrderStatus.READY_TO_SHIP,
                    changedAt: new Date(),
                });

                order.orderStatus = OrderStatus.READY_TO_SHIP;

                await order.save();

                ordersUpdated++;
            }
        }

        const finishedAt = new Date();

        await SchedulerLog.create({
            startedAt,
            finishedAt,
            ordersChecked,
            ordersUpdated,
            executionTimeMs:
                finishedAt.getTime() - startedAt.getTime(),
            status: SchedulerStatus.SUCCESS,
        });

        return {
            success: true,
            ordersChecked,
            ordersUpdated,
        };
    } catch (error: any) {
        const finishedAt = new Date();

        await SchedulerLog.create({
            startedAt,
            finishedAt,
            ordersChecked,
            ordersUpdated,
            executionTimeMs:
                finishedAt.getTime() - startedAt.getTime(),
            status: SchedulerStatus.FAILED,
            errorMessage: error.message,
        });

        throw error;
    }
};


// ┌──────── min (0)
// │ ┌────── hour (0 = midnight)
// │ │ ┌──── day of month (*)
// │ │ │ ┌── month (*)
// │ │ │ │ ┌─ day of week (1 = Monday, 4 = Thursday)
// │ │ │ │ │
// 0 0 * * 1,4

export const cronJob_updateOrderStatus = () => {
    cron.schedule("*/5 * * * *", async () => {
        console.log("Running Scheduler...");

        await runOrderScheduler();
    });
}