import express, { type Request, type Response } from 'express';
import { createServer } from 'http';
import { MONGODB_URI, NODE_ENV } from './config/env.js';
import { connectDatabase, connectMongoDBAtlas } from './config/database.js';
import cors from 'cors'
import bodyParser from "body-parser";

if (NODE_ENV != "production") {
    connectDatabase(MONGODB_URI || '');
} else {
    connectMongoDBAtlas();
}

const app = express()
const httpServer = createServer(app)

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

import orderRoutes from './routes/orderRoutes.js'

app.use(cors({
    origin: '*',
    // origin: ['http://localhost:5173'],
    credentials: true
}));

app.use("/api/order", orderRoutes)

export { httpServer }