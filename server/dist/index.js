"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env_js_1 = require("./config/env.js");
const server_js_1 = require("./server.js");
const port = env_js_1.PORT || 5000;
// listen httpServer
server_js_1.httpServer.listen(port, () => {
    console.log(`server is listening on port :: ${port}`);
});
