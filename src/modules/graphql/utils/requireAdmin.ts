import { hasPermission } from "../../access-control/helpers/hasPermission"
import { TochesContext } from "../types"
import { requireUser } from "./requireUser"
import { getUser } from "../../user/helpers/getUser"
import { ForbiddenError } from "apollo-server-koa"

export const userIsAdmin = async (userId: number) => {
  const user = await getUser(userId, { withRoles: true })

  return hasPermission(
    user.roles!.map((r) => r.name),
    "ADMIN_PANEL",
  )
}

// Ensure that the request is being carried out by an administrator.
// Throws UnauthorizedError if not logged in, ForbiddenError if not admin.
export const requireAdmin = async (context: TochesContext) => {
  const userId = await requireUser(context)

  if (!(await userIsAdmin(userId))) throw new ForbiddenError("Must be an administrator")
}
