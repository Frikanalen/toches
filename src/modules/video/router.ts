import Router from "@koa/router"
import { getResource } from "../core/middleware/getResource"
import { sendResource } from "../core/middleware/sendResource"
import { getVideo } from "./helpers/getVideo"
import { serializeVideo } from "./helpers/serializeVideo"
import { sendVideoList } from "./middleware/sendVideoList"

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

export { router as videoRouter }
