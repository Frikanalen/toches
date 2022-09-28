import {
  Bulletin,
  MutationUpdateBulletinArgs,
  Resolver,
} from "../../../generated/graphql"
import { TochesContext } from "../types"
import { AuthenticationError, ForbiddenError } from "apollo-server-koa"
import { getUser } from "../../user/helpers/getUser"
import { hasPermission } from "../../access-control/helpers/hasPermission"
import { UserData } from "../../user/models/userModel"
import { Bulletins } from "../../../generated/tableTypes"
import { db } from "../../db/db"

const requireAdmin = async (context: TochesContext) => {
  const userId = context.session?.user

  if (!userId) throw new AuthenticationError("Must be logged in")

  const user = await getUser(userId, { withRoles: true })

  if (!userIsAdmin(user)) throw new ForbiddenError("Must be an administrator")
}

const userIsAdmin = (user: UserData) =>
  hasPermission(
    user.roles!.map((r) => r.name),
    "ADMIN_PANEL",
  )

// FIXME: Altogether this is all quite hackish
export const mutationUpdateBulletin: Resolver<
  Bulletin,
  any,
  TochesContext,
  MutationUpdateBulletinArgs
> = async (_, args, context) => {
  await requireAdmin(context)

  const inputData: Partial<Bulletins> = {
    title: args.bulletin.title ?? undefined,
    text: args.bulletin.text ?? undefined,
    updated_at: new Date(),
  }

  const query = args.id
    ? db<Bulletins>("bulletins").where("id", args.id).update(inputData)
    : db<Bulletins>("bulletins").insert(inputData)

  const updated = await query.returning("id")

  const outputData = await db<Bulletins>("bulletins")
    .select({
      id: db.raw("id::text"),
      createdAt: "created_at",
      updatedAt: "updated_at",
      text: "text",
      title: "title",
    })
    .where("id", updated[0].id)
    .first()

  return outputData!
}
