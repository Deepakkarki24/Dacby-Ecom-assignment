"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpServer = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const env_js_1 = require("./config/env.js");
const database_js_1 = require("./config/database.js");
const cors_1 = __importDefault(require("cors"));
if (env_js_1.NODE_ENV != "production") {
    (0, database_js_1.connectDatabase)(env_js_1.MONGODB_URI || '');
}
else {
    (0, database_js_1.connectMongoDBAtlas)();
}
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
exports.httpServer = httpServer;
app.use(express_1.default.json());
// app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use((0, cors_1.default)({
    // origin : '*', 
    origin: ['http://localhost:5173'],
    credentials: true
}));
