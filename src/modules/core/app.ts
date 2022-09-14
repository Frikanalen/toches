import Koa from "koa"
import bodyParser from "koa-bodyparser"
import { useCSRFProtection } from "../auth/middleware/useCSRFProtection"
import { useSession } from "../auth/middleware/useSession"
import { IS_PROD } from "./constants"
import { handleError } from "./middleware/handleError"
import { sendCORSHeaders } from "./middleware/sendCORSHeaders"
import logger from "koa-logger"
import { router } from "./router"
import { openApiSpec } from "./middleware/sendOpenApiSpec"
import { apolloServer } from "../graphql/server"
import { log } from "./log"

const { ui } = require("swagger2-koa")

const app = new Koa()

app.proxy = IS_PROD

app.use(ui(openApiSpec, "/swagger"))
app.use(logger())
app.use(handleError())
app.use(bodyParser())
app.use(useSession(app))
app.use(useCSRFProtection())
app.use(sendCORSHeaders())
app.use(router.middleware())

app.on("error", (err) => log.error(err))

apolloServer.start().then(() => apolloServer.applyMiddleware({ app }))

export { app }
