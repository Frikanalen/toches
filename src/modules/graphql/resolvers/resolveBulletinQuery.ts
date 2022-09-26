import { Bulletin, QueryBulletinArgs, Resolver } from "../../../generated/graphql"
import { db } from "../../db/db"

export const resolveBulletinQuery: Resolver<
  Bulletin,
  any,
  any,
  QueryBulletinArgs
> = async (parent, args) => {
  const item = await db
    .select("id", "text", "title")
    .select({ createdAt: "created_at", updatedAt: "updated_at" })
    .from("bulletins")
    .where("id", args.id)
    .first()

  return item
}
