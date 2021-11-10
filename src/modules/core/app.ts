import Koa from "koa"
import bodyParser from "koa-bodyparser"
import { handleError } from "./middleware/handleError"

import { router } from "./router"

const app = new Koa()

app.use(handleError())
app.use(bodyParser())
app.use(router.middleware())

export { app }