import { UserData } from "../models/userModel"
import { UserQueryParams } from "../queries/userQuery"

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         email:
 *           type: string
 *           format: email
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         createdAt:
 *           type: string
 *         roles:
 *           type: array
 *           items:
 *             type: string
 */
export const serializeUser = (options?: UserQueryParams) => (data: UserData) => {
  const { id, firstName, lastName, email, createdAt } = data
  const roles = options?.withRoles ? data.roles!.map((r) => r.name) : undefined

  return { id, firstName, lastName, email, createdAt, roles }
}
