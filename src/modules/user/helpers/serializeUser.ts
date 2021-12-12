import { getRolePermissions } from "../../access-control/helpers/getRolePermissions"
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
 *         permissions:
 *           type: array
 *           items:
 *             type: string
 */
export const serializeUser = (options?: UserQueryParams) => (data: UserData) => {
  const { id, firstName, lastName, email, createdAt } = data

  const roles = options?.withRoles ? data.roles!.map((r) => r.name) : undefined
  const permissions = roles ? getRolePermissions(roles) : undefined

  return { id, firstName, lastName, email, createdAt, permissions }
}
