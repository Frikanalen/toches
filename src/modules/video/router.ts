import Router from "@koa/router"
import { requireSecretKey } from "../auth/middleware/requireSecretKey"
import { createResource } from "../core/middleware/createResource"
import { getResource } from "../core/middleware/getResource"
import { sendResource } from "../core/middleware/sendResource"
import { validateSchema } from "../validation/middleware/validateSchema"
import { createVideoMedia } from "./helpers/createVideoMedia"
import { getVideo } from "./helpers/getVideo"
import { serializeVideo } from "./helpers/serializeVideo"
import { sendVideoList } from "./middleware/sendVideoList"
import { videoMediaSchema } from "./schemas/videoMediaSchema"

const router = new Router({
  prefix: "/videos",
})

/**
 * @openapi
 * /videos:
 *   get:
 *     tags:
 *       - Video
 *     summary: Get a list of videos
 *     parameters:
 *       - $ref: '#/components/parameters/offset'
 *       - $ref: '#/components/parameters/limit'
 *     responses:
 *       200:
 *         description: A list of videos
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ResourceList'
 *                 - type: object
 *                   properties:
 *                     rows:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Video'
 */
router.get("/", sendVideoList())

/**
 * @openapi
 * /videos/{id}:
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: integer
 *   get:
 *     tags:
 *       - Video
 *     summary: Get a specific video by id
 *     responses:
 *       200:
 *         description: A video
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Video'
 *       404:
 *          $ref: '#/components/responses/ResourceNotFound'
 */
router.get(
  "/:id",
  getResource((context) => getVideo(context.params.id)),
  sendResource(serializeVideo),
)

/**
 * @openapi
 * videos/media:
 *   post:
 *     tags:
 *       - Video
 *     summary: Internally create a video media entry
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VideoMediaForm'
 *     responses:
 *       201:
 *         description: Video media was created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 */
router.post(
  "/media",
  requireSecretKey(),
  validateSchema(videoMediaSchema),
  createResource(createVideoMedia),
  sendResource((m) => ({ id: m })),
)

export { router as videoRouter }
