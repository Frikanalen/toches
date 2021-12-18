import Router from "@koa/router"
import { authRouter } from "../auth/router"
import { organizationRouter } from "../organization/router"
import { playlistRouter } from "../playlist/router"
import { proxyRouter } from "../proxy/router"
import { scheduleRouter } from "../scheduling/router"
import { userRouter } from "../user/router"
import { videoRouter } from "../video/router"
import { sendConfig } from "./middleware/sendConfig"
import { sendOpenApiSpec } from "./middleware/sendOpenApiSpec"

const router = new Router()

/**
 * @openapi
 * /open-api-spec.json:
 *   get:
 *     tags:
 *       - App
 *     summary: Get OpenAPI specification
 *     responses:
 *       200:
 *         description: The specification, in JSON format.
 *
 */
router.get("/open-api-spec.json", sendOpenApiSpec())

/**
 * @openapi
 * /config:
 *   get:
 *     tags:
 *       - App
 *     summary: Get core data and config
 *     description: This endpoint returns such things as server hostnames, categories, and other mostly static data.
 *     responses:
 *       200:
 *         description: The config result
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Config'
 */
router.get("/config", sendConfig())

router.use(proxyRouter.middleware())
router.use(authRouter.middleware())
router.use(userRouter.middleware())
router.use(organizationRouter.middleware())
router.use(videoRouter.middleware())
router.use(scheduleRouter.middleware())
router.use(playlistRouter.middleware())

export { router }
