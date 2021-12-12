import Koa from "koa"
import bodyParser from "koa-bodyparser"
import { useCSRFProtection } from "../auth/middleware/useCSRFProtection"
import { useSession } from "../auth/middleware/useSession"
import { handleError } from "./middleware/handleError"
import { logRequest } from "./middleware/logRequest"
import { sendCORSHeaders } from "./middleware/sendCORSHeaders"

import { router } from "./router"

const app = new Koa()

app.use(logRequest())
app.use(handleError())
app.use(bodyParser())
app.use(useSession(app))
app.use(useCSRFProtection())
app.use(sendCORSHeaders())
app.use(router.middleware())

export { app }
