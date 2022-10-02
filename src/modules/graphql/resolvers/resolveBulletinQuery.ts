import { Bulletin, QueryBulletinArgs, Resolver } from "../../../generated/graphql"
import { db } from "../../db/db"

export const getBulletin = async (bulletinId: number | string): Promise<Bulletin> =>
  await db
    .select("id", "text", "title")
    .select({ createdAt: "created_at", updatedAt: "updated_at" })
    .from("bulletins")
    .where("id", bulletinId)
    .first()

export const resolveBulletin: Resolver<Bulletin, { bulletinId: number }> = (parent) =>
  getBulletin(parent.bulletinId)

export const resolveBulletinQuery: Resolver<
  Bulletin,
  any,
  any,
  QueryBulletinArgs
> = async (parent, { id }) => getBulletin(id)
