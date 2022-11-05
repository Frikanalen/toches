import { TochesContext } from "../types"
import { requireUser } from "./requireUser"
import { ForbiddenError, UserInputError } from "apollo-server-koa"
import { db } from "../../db/db"
import { userIsAdmin } from "./requireAdmin"

// Ensure that the request is being carried out by the editor of a video's organization
// Throws UnauthorizedError if not logged in, ForbiddenError if not admin.
export const requireVideoOwner = async (context: TochesContext, videoId: string) => {
  const userId = await requireUser(context)

  if (await userIsAdmin(userId)) return

  const organizationId = (
    await db("videos").select("organization_id").where("id", videoId).first()
  )?.organization_id

  if (!organizationId) throw new UserInputError("Unknown organization!")

  const editorId = (
    await db("organizations").select("editor_id").where("id", organization_id).first()
  )?.editor_id

  console.log(editorId)

  if (userId !== editorId) throw new ForbiddenError("Must be editor of organization!")
}
