import {
  BulletinPagination,
  QueryBulletinsArgs,
  Resolver,
} from "../../../generated/graphql"
import { db } from "../../db/db"
import { getPageInfo } from "../utils/getPageInfo"

export const resolveBulletinsQuery: Resolver<
  BulletinPagination,
  any,
  any,
  QueryBulletinsArgs
> = async (parent, args) => {
  const { page = 0, perPage = 25 } = args

  const items = await db
    .select("id", "text", "title")
    .select({ createdAt: "created_at", updatedAt: "updated_at" })
    .orderBy("created_at", "desc")
    .from("bulletins")
    .limit(perPage)

  const pageInfo = getPageInfo(items.length, page, perPage)

  return {
    items,
    pageInfo,
  }
}
