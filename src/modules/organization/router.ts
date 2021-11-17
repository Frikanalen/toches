import Router from "@koa/router"
import { checkPermissions } from "../access-control/middleware/checkPermission"
import { authenticate } from "../auth/middleware/authenticate"
import { createResource } from "../core/middleware/createResource"
import { getResource } from "../core/middleware/getResource"
import { sendResource } from "../core/middleware/sendResource"
import { validateSchema } from "../validation/middleware/validateSchema"
import { createOrganization } from "./helpers/createOrganization"
import { getOrganization } from "./helpers/getOrganization"
import { serializeOrganization } from "./helpers/serializeOrganization"
import { addOrganizationMember } from "./middleware/addOrganizationMember"
import { removeOrganizationMember } from "./middleware/removeOrganizationMember"
import { sendOrganizationList } from "./middleware/sendOrganizationList"
import { sendOrganizationMemberList } from "./middleware/sendOrganizationMemberList"
import { isOrganizationEditor } from "./permissions"
import { organizationSchema } from "./schemas/organizationSchema"

const router = new Router({
  prefix: "/organizations",
})

const organizationGetterMiddleware = getResource((context) =>
  getOrganization(context.params.id),
)

/**
 * @openapi
 * /organizations:
 *   get:
 *     tags:
 *       - Organization
 *     summary: Get a list of organizations
 *     parameters:
 *       - $ref: '#/components/parameters/offset'
 *       - $ref: '#/components/parameters/limit'
 *     responses:
 *       200:
 *         description: A list of organizations
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
router.get("/", sendOrganizationList())

/**
 * @openapi
 * /organizations:
 *   post:
 *     tags:
 *       - Organization
 *     summary: Create a new organization
 *     security:
 *       - cookie: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewOrganizationForm'
 *     responses:
 *       200:
 *         description: Organization was created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Organization'
 */
router.post(
  "/",
  authenticate({ required: true }),
  validateSchema(organizationSchema),
  createResource((data, context) => createOrganization(data, context.state.user.id)),
  sendResource(serializeOrganization),
)

/**
 * @openapi
 * /organizations/{id}:
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: integer
 *   get:
 *     tags:
 *       - Organization
 *     summary: Get a specific organization by id
 *     responses:
 *       200:
 *         description: An organization
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Organization'
 *       404:
 *          $ref: '#/components/responses/ResourceNotFound'
 */
router.get("/:id", organizationGetterMiddleware, sendResource(serializeOrganization))

// Member management
router.use(
  "/:id/members",
  authenticate({ required: true }),
  organizationGetterMiddleware,
  checkPermissions([isOrganizationEditor]),
)

/**
 * @openapi
 * /organizations/{id}/members:
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: integer
 *   get:
 *     tags:
 *       - Organization
 *     summary: Get a list of members for an organization
 *     security:
 *       - cookie: []
 *     responses:
 *       200:
 *         description: A list of users
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
 *                         $ref: '#/components/schemas/User'
 *       403:
 *         $ref: '#/components/responses/PermissionDenied'
 *       404:
 *          $ref: '#/components/responses/ResourceNotFound'
 *       401:
 *         $ref: '#/components/responses/AuthenticationRequired'
 *   post:
 *     tags:
 *       - Organization
 *     summary: Add a user as a member to an organization
 *     security:
 *       - cookie: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       200:
 *         description: The user was added as a member
 *       404:
 *         description: The user with that email doesn't exist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No user with that email exists
 *                 details:
 *                   type: string
 *                   example: email_invalid
 *       401:
 *         $ref: '#/components/responses/AuthenticationRequired'
 */
router.get("/:id/members", sendOrganizationMemberList())
router.post("/:id/members", addOrganizationMember())

/**
 * @openapi
 * /organizations/{id}/members/{member}:
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: integer
 *     - in: path
 *       name: member
 *       required: true
 *       schema:
 *         type: integer
 *   delete:
 *     tags:
 *       - Organization
 *     summary: Remove a member from an organization
 *     security:
 *       - cookie: []
 *     responses:
 *       200:
 *         description: The member was removed from the organization
 */
router.delete("/:id/members/:member", removeOrganizationMember())

export { router as organizationRouter }
