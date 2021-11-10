import Koa from "koa"
import bodyParser from "koa-bodyparser"
import { useSession } from "../auth/middleware/useSession"
import { handleError } from "./middleware/handleError"

import { router } from "./router"

const app = new Koa()

app.use(handleError())
app.use(bodyParser())
app.use(useSession(app))
app.use(router.middleware())

export { app }
