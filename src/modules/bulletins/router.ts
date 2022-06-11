import Router from "@koa/router"
import { authenticate } from "../auth/middleware/authenticate"
import { createResource } from "../core/middleware/createResource"
import { sendResource } from "../core/middleware/sendResource"
import { validateSchema } from "../validation/middleware/validateSchema"
import { sendBulletinList } from "./middleware/sendBulletinList"
import { bulletinSchema } from "./schema"
import { createBulletin } from "./helpers/createBulletin"
import { serializeBulletin } from "./helpers/serializeBulletin"
import { getResource } from "../core/middleware/getResource"
import { getBulletin } from "./helpers/getBulletin"
import { checkPermissions } from "../access-control/middleware/checkPermission"
import { isAdmin } from "../user/permissions"
import { updateResource } from "../core/middleware/updateResource"
import { updateBulletin } from "./helpers/updateBulletin"

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
 *                         $ref: '#/components/schemas/Bulletin'
 */
router.get("/", sendBulletinList())

/**
 * @openapi
 * /bulletins/{id}:
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: integer
 *   get:
 *     tags:
 *       - Bulletins
 *     summary: Get a specific news bulletin by id
 *     responses:
 *       200:
 *         description: Bulletin
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bulletin'
 *       404:
 *          $ref: '#/components/responses/ResourceNotFound'
 */
router.get(
  "/:id",
  getResource((context) => getBulletin(context.params.id)),
  sendResource(serializeBulletin),
)

router.put(
  "/:id",
  authenticate({
    required: true,
  }),
  getResource((context) => getBulletin(context.params.id)),
  validateSchema(bulletinSchema),
  checkPermissions([isAdmin]),
  updateResource((data, context) => updateBulletin(context.params.id, data)),
  sendResource(serializeBulletin),
)


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
