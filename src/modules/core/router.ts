import Router from "@koa/router"
import { authRouter } from "../auth/router"
import { organizationRouter } from "../organization/router"

const router = new Router({
  prefix: "/v2",
})

router.use(authRouter.middleware())
router.use(organizationRouter.middleware())

export { router }
