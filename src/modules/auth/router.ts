import Router from "@koa/router"
import { authenticate } from "./middleware/authenticate"
import { login } from "./middleware/login"
import { logout } from "./middleware/logout"
import { register } from "./middleware/register"
import { sendAuthenticatedUser } from "./middleware/sendAuthenticatedUser"
import { sendUserPermissionState } from "./middleware/sendUserPermissionState"

const router = new Router({
  prefix: "/auth",
})

/**
 * @openapi
 * /auth/register:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Register a new user
 *     description:
 *       With a successful response, you will be logged in with the new user and assigned a new CSRF token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterForm'
 *     responses:
 *       200:
 *         description: The user was created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       409:
 *         description: Email is already in use
 */
router.post("/register", register())

/**
 * @openapi
 * /auth/login:
 *   post:
 *     operationId: loginUser
 *     tags:
 *       - Authentication
 *     summary: Log in with existing user
 *     description:
 *       With a successful response, you will be logged in with the specified user and assigned a new CSRF token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginForm'
 *     responses:
 *       200:
 *         description: Login was successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       401:
 *         description: Incorrect username or password
 */
router.post("/login", login())

/**
 * @openapi
 * /auth/logout:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Log out of the currently logged in user (if any)
 *     responses:
 *       200:
 *         description: Logout was successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.post("/logout", logout())

/**
 * @openapi
 * /auth/hasPermission:
 *   get:
 *     operationId: checkPermission
 *     tags:
 *       - Authentication
 *     parameters:
 *       - in: query
 *         name: hasPermission
 *         description:
 *           Check if the logged in user has a specific role permission. Should be the name of a permission (e.g. `ATEM_CONTROL`)
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful request or permission granted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 hasPermission:
 *                   type: boolean
 *
 */

/**
 * @openapi
 * /auth/user:
 *   get:
 *     operationId: userProfile
 *     tags:
 *       - Authentication
 *     summary: Get information about the logged in user
 *     description:
 *       Returns the logged in user (omitted if anonymous). If the `hasPermission` query param is used, only a status code and message is returned instead.
 *     responses:
 *       200:
 *         description: Successful request or permission granted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 authenticated:
 *                   type: boolean
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Authentication required or permission denied (only for `hasPermission`)
 *       400:
 *         description: Specified permission doesn't exist
 */
router.get(
  "/user",
  authenticate({ withRoles: true }),
  sendUserPermissionState(),
  sendAuthenticatedUser(),
)

export { router as authRouter }
