import Router from "@koa/router"
import { authRouter } from "../auth/router"
import { organizationRouter } from "../organization/router"
import { sendOpenApiSpec } from "./middleware/sendOpenApiSpec"

const router = new Router()

router.get("/open-api-spec.json", sendOpenApiSpec())
router.use(authRouter.middleware())
router.use(organizationRouter.middleware())

export { router }
