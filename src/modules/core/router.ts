import Router from "@koa/router"
import { authRouter } from "../auth/router"
import { organizationRouter } from "../organization/router"
import { proxyRouter } from "../proxy/router"
import { scheduleRouter } from "../scheduling/router"
import { userRouter } from "../user/router"
import { videoRouter } from "../video/router"
import { sendConfig } from "./middleware/sendConfig"
import { sendOpenApiSpec } from "./middleware/sendOpenApiSpec"

const router = new Router()

router.get("/open-api-spec.json", sendOpenApiSpec())
router.get("/config", sendConfig())
router.use(proxyRouter.middleware())
router.use(authRouter.middleware())
router.use(userRouter.middleware())
router.use(organizationRouter.middleware())
router.use(videoRouter.middleware())
router.use(scheduleRouter.middleware())

export { router }
