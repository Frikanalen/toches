import Koa from "koa"
import bodyParser from "koa-bodyparser"
import { useCSRFProtection } from "../auth/middleware/useCSRFProtection"
import { useSession } from "../auth/middleware/useSession"
import { IS_PROD } from "./constants"
import { handleError } from "./middleware/handleError"
import { logRequest } from "./middleware/logRequest"
import { sendCORSHeaders } from "./middleware/sendCORSHeaders"

import { router } from "./router"
import { openApiSpec } from "./middleware/sendOpenApiSpec"
import { apolloServer } from "../graphql/server"
import { log } from "./log"
const { ui } = require("swagger2-koa")

const app = new Koa()

app.proxy = IS_PROD

app.use(ui(openApiSpec, "/swagger"))
app.use(logRequest())
app.use(handleError())
app.use(bodyParser())
app.use(useSession(app))
app.use(useCSRFProtection())
app.use(sendCORSHeaders())
app.use(router.middleware())

app.on("error", (err) => log.error(err))

apolloServer.start().then(() => {
  router.post("/graphql", apolloServer.getMiddleware())
  router.get("/graphql", apolloServer.getMiddleware())
})

export { app }
