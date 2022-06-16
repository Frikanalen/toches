import Router from "@koa/router"
import { createResource } from "../core/middleware/createResource"
import { sendResource } from "../core/middleware/sendResource"
import { validateSchema } from "../validation/middleware/validateSchema"
import { sendBulletinList } from "./middleware/sendBulletinList"
import { bulletinSchema } from "./schema"
import { createBulletin } from "./helpers/createBulletin"
import { serializeBulletin } from "./helpers/serializeBulletin"
import { getResource } from "../core/middleware/getResource"
import { getBulletin } from "./helpers/getBulletin"
import { requirePermissions } from "../access-control/middleware/checkPermission"
import { isAdmin } from "../user/permissions"
import { updateResource } from "../core/middleware/updateResource"
import { updateBulletin } from "./helpers/updateBulletin"
import { deleteBulletin } from "./helpers/deleteBulletin"
import { authenticate } from "../auth/middleware/authenticate"

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

/**
 * @openapi
 * /bulletins/{id}:
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: integer
 *   put:
 *     tags:
 *       - Bulletins
 *     summary: Update a bulletin
 *     responses:
 *       200:
 *         description: Bulletin
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bulletin'
 *       404:
 *          $ref: '#/components/responses/ResourceNotFound'
 *       403:
 *          $ref: '#/components/responses/PermissionDenied'
 */
router.put(
  "/:id",
  authenticate({ required: true }),
  requirePermissions([isAdmin]),
  getResource((context) => getBulletin(context.params.id)),
  validateSchema(bulletinSchema),
  updateResource((data, context) => updateBulletin(context.params.id, data)),
  sendResource(serializeBulletin),
)

/**
 * @openapi
 * /bulletins/{id}:
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: integer
 *   delete:
 *     tags:
 *       - Bulletins
 *     summary: Deletes a bulletin
 *     responses:
 *       204:
 *          description: The resource was deleted successfully.
 *       404:
 *          $ref: '#/components/responses/ResourceNotFound'
 *       403:
 *          $ref: '#/components/responses/PermissionDenied'
 */

router.delete(
  "/:id",
  authenticate({ required: true }),
  requirePermissions([isAdmin]),
  deleteBulletin(),
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
  requirePermissions([isAdmin]),
  validateSchema(bulletinSchema),
  createResource((data) => createBulletin(data)),
  sendResource(serializeBulletin),
)

export { router as bulletinRouter }
