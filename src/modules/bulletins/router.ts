import Router from "@koa/router"
import { authenticate } from "../auth/middleware/authenticate"
import { createResource } from "../core/middleware/createResource"
import { sendResource } from "../core/middleware/sendResource"
import { validateSchema } from "../validation/middleware/validateSchema"
import { sendBulletinList } from "./middleware/sendBulletinList"
import { bulletinSchema } from "./schema"
import { createBulletin } from "./helpers/createBulletin"
import { serializeBulletin } from "./helpers/serializeBulletin"

const router = new Router({
  prefix: "/bulletins",
})

/**
 * @openapi
 * /bulletins:
 *   get:
 *     tags:
 *       - Bulletins
 *     summary: Get a list of bulletins
 *     parameters:
 *       - $ref: '#/components/parameters/offset'
 *       - $ref: '#/components/parameters/limit'
 *       - in: query
 *         name: editor
 *         description: An id of the editor (user) to filter by
 *         required: false
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of bulletins
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
 *                         $ref: '#/components/schemas/Organization'
 */
router.get("/", sendBulletinList())

/**
 * @openapi
 * /bulletins:
 *   post:
 *     tags:
 *       - Bulletins
 *     summary: Create a new bulletin
 *     security:
 *       - cookie: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewBulletinForm'
 *     responses:
 *       200:
 *         description: Organization was created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bulletin'
 */
router.post(
  "/",
  authenticate({ required: true }),
  validateSchema(bulletinSchema),
  createResource((data, _context) => createBulletin(data)),
  sendResource(serializeBulletin),
)

export { router as bulletinRouter }
