import express, { type Request, type Response } from 'express';
import { createServer } from 'http';
import { MONGODB_URI, NODE_ENV } from './config/env.js';
import { connectDatabase, connectMongoDBAtlas } from './config/database.js';
import cors from 'cors'
import bodyParser from "body-parser";

// database connection
if (NODE_ENV != "production") {
    connectDatabase(MONGODB_URI || '');
} else {
    connectMongoDBAtlas();
}

// route files import
import orderRoutes from './routes/orderRoutes.js'

const app = express()
const httpServer = createServer(app)

app.use(express.json({ limit: '100kb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '100kb' }));

app.use(cors({
    origin: '*',
    // origin: ['http://localhost:5173'],
    credentials: true
}));


// router will be use here with middleware
app.use("/api/order", orderRoutes)


export { httpServer }