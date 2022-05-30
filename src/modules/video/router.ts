import Router from "@koa/router"
import { requireSecretKey } from "../auth/middleware/requireSecretKey"
import { createResource } from "../core/middleware/createResource"
import { getResource } from "../core/middleware/getResource"
import { sendResource } from "../core/middleware/sendResource"
import { validateSchema } from "../validation/middleware/validateSchema"
import { createVideoMedia } from "./helpers/createVideoMedia"
import { createVideoMediaAsset } from "./helpers/createVideoMediaAsset"
import { getVideo } from "./helpers/getVideo"
import { serializeVideo } from "./helpers/serializeVideo"
import { sendVideoList } from "./middleware/sendVideoList"
import { videoMediaAssetSchema } from "./schemas/videoMediaAssetSchema"
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
 *       - in: query
 *         name: inPlaylist
 *         description: An id of a playlist to filter by. Orders by playlist entry indices.
 *         required: false
 *         schema:
 *           type: integer
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
 * /videos/media:
 *   post:
 *     tags:
 *       - Internal
 *     summary: (Used by media-processor) Register an uploaded file in the database
 *     parameters:
 *       - in: header
 *         name: X-Api-Key
 *         schema:
 *           type: string
 *         required: true
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
 *               required:
 *                 - id
 */
router.post(
  "/media",
  requireSecretKey(),
  validateSchema(videoMediaSchema),
  createResource(createVideoMedia),
  sendResource((m) => ({ id: m })),
)

/**
 * @openapi
 * /videos/media/{id}/assets:
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: integer
 *     - in: header
 *       name: X-Api-Key
 *       schema:
 *         type: string
 *       required: true
 *   post:
 *     tags:
 *       - Internal
 *     summary: (Used by media-processor) Register a new video media asset
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VideoMediaAssetForm'
 *     responses:
 *       201:
 *         description: Video media asset was created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *               required:
 *                 - id
 */
router.post(
  "/media/:id/assets",
  requireSecretKey(),
  validateSchema(videoMediaAssetSchema),
  createResource((data, context) => createVideoMediaAsset(context.params.id, data)),
  sendResource((a) => ({ id: a })),
)

export { router as videoRouter }
