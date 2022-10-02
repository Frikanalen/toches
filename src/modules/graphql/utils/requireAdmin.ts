import { UserData } from "../../user/models/userModel"
import { hasPermission } from "../../access-control/helpers/hasPermission"
import { TochesContext } from "../types"
import { requireUser } from "./requireUser"
import { getUser } from "../../user/helpers/getUser"
import { ForbiddenError } from "apollo-server-koa"

const userIsAdmin = (user: UserData) =>
  hasPermission(
    user.roles!.map((r) => r.name),
    "ADMIN_PANEL",
  )

// Ensure that the request is being carried out by an administrator.
// Throws UnauthorizedError if not logged in, ForbiddenError if not admin.
export const requireAdmin = async (context: TochesContext) => {
  const userId = await requireUser(context)

  const user = await getUser(userId, { withRoles: true })

  if (!userIsAdmin(user)) throw new ForbiddenError("Must be an administrator")
}
