import { TochesContext } from "../types"
import { requireUser } from "./requireUser"
import { ForbiddenError } from "apollo-server-koa"
import { db } from "../../db/db"
import { userIsAdmin } from "./requireAdmin"

export type DatabaseKey = string | number

export const getDatabaseKey = (key: DatabaseKey) => {
  if (typeof key === "string") return key
  return key.toString()
}

// Ensure that the request is being carried out by the editor of the organization
// Throws UnauthorizedError if not logged in, ForbiddenError if not admin.
export const requireOrganizationEditor = async (
  session: TochesContext["session"],
  organizationId: DatabaseKey,
) => {
  const userId = await requireUser(session)

  if (await userIsAdmin(userId)) return

  const { editor_id: editorId } = await db("organizations")
    .select("editor_id")
    .where("id", getDatabaseKey(organizationId))
    .first()

  if (userId !== editorId) throw new ForbiddenError("Must be editor of organization!")
}
