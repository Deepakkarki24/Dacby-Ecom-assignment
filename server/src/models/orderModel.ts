import mongoose, { Schema, Document } from "mongoose";

export enum PaymentStatus {
  PAID = "PAID",
  PENDING = "PENDING",
}

export enum OrderStatus {
  PLACED = "PLACED",
  PROCESSING = "PROCESSING",
  READY_TO_SHIP = "READY_TO_SHIP",
}

interface OrderStatusHistory {
  from: OrderStatus;
  to: OrderStatus;
  changedAt: Date;
}

export interface OrderDocument extends Document {
  orderId: string;
  customerName: string;
  phoneNumber: string;
  productName: string;
  amount: number;
  price: number;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  orderStatusHistory: OrderStatusHistory[];
  createdAt: Date;
  updatedAt: Date;
}

const orderStatusHistorySchema = new Schema<OrderStatusHistory>(
  {
    from: {
      type: String,
      enum: Object.values(OrderStatus),
      required: true,
    },
    to: {
      type: String,
      enum: Object.values(OrderStatus),
      required: true,
    },
    changedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    _id: false,
  }
);

const orderSchema = new Schema<OrderDocument>(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    customerName: {
      type: String,
      required: true,
      trim: true,
    },

    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },

    productName: {
      type: String,
      required: true,
      trim: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    paymentStatus: {
      type: String,
      enum: Object.values(PaymentStatus),
      default: PaymentStatus.PENDING,
    },

    orderStatus: {
      type: String,
      enum: Object.values(OrderStatus),
      default: OrderStatus.PLACED,
    },

    orderStatusHistory: {
      type: [orderStatusHistorySchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export const Order = mongoose.model<OrderDocument>("Order", orderSchema);