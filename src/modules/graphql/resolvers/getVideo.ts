import { UserInputError } from "apollo-server-koa"
import { db } from "../../db/db"
import { Videos } from "../../../generated/tableTypes"
import { QueryVideosArgs, Resolver } from "../../../generated/graphql"
import { getPageInfo } from "../utils/getPageInfo"
import { getOrderBy } from "../utils/getOrderBy"
import { VideoPaginationWithDescendants, VideoWithDescendants } from "../types"

export const resolveVideoQuery: Resolver<
  VideoWithDescendants,
  any,
  any,
  { id: string }
> = async (parent, args) => {
  const id = parseInt(args.id)

  const query = db<Videos>("videos")
    .select("title", {
      description: db.raw("COALESCE(description, '')"),
      id: db.raw("id::text"),
      createdAt: "created_at",
      updatedAt: "updated_at",
      viewCount: "view_count",
      organizationId: "organization_id",
      mediaId: "media_id",
    })
    .where("id", id)
    .first()

  const video = await query

  if (!video) throw new UserInputError(`Video ${id} does not exist`, { id })

  return video
}

// Count the rows of a given table
// TODO: Add filter option
const countRows = async (tableName: string): Promise<number> => {
  const data = await db(tableName).count({ rowCount: "*" })

  return parseInt(data[0]?.rowCount as string)
}

export const resolveVideosQuery: Resolver<
  VideoPaginationWithDescendants,
  any,
  any,
  QueryVideosArgs
> = async (parent, args) => {
  const { filter, sort, page = 0, perPage = 25 } = args

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
    })
    .orderBy(getOrderBy(sort))
    .offset((page - 1) * perPage)
    .limit(perPage)

  let items

  if (filter) {
    items = await query.where("organization_id", filter.organizationId)
  } else items = await query

  const pageInfo = getPageInfo(await countRows("videos"), page, perPage)

  return {
    items,
    pageInfo,
  }
}
