import mongoose, { Schema, Document } from "mongoose";

export enum SchedulerStatus {
    SUCCESS = "SUCCESS",
    FAILED = "FAILED",
}

export interface SchedulerLogDocument extends Document {
    startedAt: Date;
    finishedAt: Date;
    ordersChecked: number;
    ordersUpdated: number;
    executionTimeMs: number;
    status: SchedulerStatus;
    errorMessage?: string;
}

const schedulerLogSchema = new Schema<SchedulerLogDocument>(
    {
        startedAt: {
            type: Date,
            required: true,
        },

        finishedAt: {
            type: Date,
            required: true,
        },

        ordersChecked: {
            type: Number,
            default: 0,
        },

        ordersUpdated: {
            type: Number,
            default: 0,
        },

        executionTimeMs: {
            type: Number,
            required: true,
        },

        status: {
            type: String,
            enum: Object.values(SchedulerStatus),
            required: true,
        },

        errorMessage: {
            type: String,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

export const SchedulerLog = mongoose.model<SchedulerLogDocument>(
    "SchedulerLog",
    schedulerLogSchema
);