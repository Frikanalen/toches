import { Resolver, VideoQueriesListArgs } from "../../../generated/graphql"
import { VideoPaginationWithKeys } from "../types"
import { db } from "../../db/db"
import { Videos } from "../../../generated/tableTypes"
import { getOrderBy } from "../utils/getOrderBy"
import { getPageInfo } from "../utils/getPageInfo"
import { UserInputError } from "apollo-server-koa"

// Count the rows of a given table
// TODO: Add filter option
const countRows = async (tableName: string): Promise<number> => {
  const data = await db(tableName).count({ rowCount: "*" })

  return parseInt(data[0]?.rowCount as string)
}

export const resolveVideoList: Resolver<
  VideoPaginationWithKeys,
  any,
  any,
  VideoQueriesListArgs
> = async (parent, { input }) => {
  const { filter, sort, page = 0, perPage = 25 } = input

  if (perPage < 1) throw new UserInputError("perPage minimum value is 1.")
  if (perPage > 100) throw new UserInputError("perPage maximum value is 100.")
  if (page < 1) throw new UserInputError("page minimum value is 1.")

  const query = db<Videos>("videos")
    .select("title", {
      description: db.raw<string>("COALESCE(description, '')"),
      id: db.raw<string>("id::text"),
      createdAt: "created_at",
      updatedAt: "updated_at",
      viewCount: "view_count",
      organizationId: "organization_id",
      mediaId: "media_id",
      url: db.raw("('/video/' || id::text)"),
    })
    .orderBy(getOrderBy(sort))
    .offset((page - 1) * perPage)
    .limit(perPage)

  let items

  if (filter) {
    items = await query.where("organization_id", filter.organizationId)
  } else items = await query

  const pageInfo = getPageInfo(100, Math.trunc(page), Math.trunc(perPage))

  return {
    items,
    pageInfo,
  }
}
