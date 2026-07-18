import { PORT } from "./config/env.js"
import { httpServer } from "./server.js"

const port = PORT || 5000

// listen httpServer
httpServer.listen(port, () => {
    console.log(`server is listening on port :: ${port}`)
})