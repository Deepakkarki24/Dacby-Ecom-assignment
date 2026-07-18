import express, { type Request, type Response } from 'express';
import { createServer } from 'http';

const APP = express()

const httpServer = createServer(APP)

export { httpServer }