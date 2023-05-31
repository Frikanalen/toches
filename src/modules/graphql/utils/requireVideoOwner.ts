import { TochesContext } from "../types"
import { requireUser } from "./requireUser"
import { ForbiddenError, UserInputError } from "apollo-server-koa"
import { db } from "../../db/db"
import { userIsAdmin } from "./requireAdmin"
import { DatabaseKey } from "./requireOrganizationEditor"

// Ensure that the request is being carried out by the editor of a video's organization
// Throws UnauthorizedError if not logged in, ForbiddenError if not admin.
export const requireVideoOwner = async (
  session: TochesContext["session"],
  videoId: DatabaseKey,
) => {
  const userId = await requireUser(session)

  if (await userIsAdmin(userId)) return

  const { organization_id: organizationId } = await db("videos")
    .select("organization_id")
    .where("id", videoId)
    .first()

  if (!organizationId) throw new UserInputError("Unknown organization!")

  const { editor_id: editorId } = await db("organizations")
    .select("editor_id")
    .where("id", organizationId)
    .first()

  if (userId !== editorId) throw new ForbiddenError("Must be editor of organization!")
}
