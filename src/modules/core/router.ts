import Router from "@koa/router"
import { authRouter } from "../auth/router"

const router = new Router({
  prefix: "/v2",
})

router.use(authRouter.middleware())

export { router }
