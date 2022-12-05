import { TochesContext } from "../types"
import { requireUser } from "./requireUser"
import { ForbiddenError } from "apollo-server-koa"
import { db } from "../../db/db"
import { userIsAdmin } from "./requireAdmin"

// Ensure that the request is being carried out by the editor of the organization
// Throws UnauthorizedError if not logged in, ForbiddenError if not admin.
export const requireOrganizationEditor = async (
  context: TochesContext,
  organizationId: string,
) => {
  const userId = await requireUser(context)

  if (await userIsAdmin(userId)) return

  const editorId = (
    await db("organizations").select("editor_id").where("id", organizationId).first()
  )?.editor_id

  if (userId !== editorId) throw new ForbiddenError("Must be editor of organization!")
}
