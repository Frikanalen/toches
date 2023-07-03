import { Resolver, VideoQueriesListArgs } from "../../../generated/graphql"
import { VideoPaginationWithKeys } from "../types"
import { db } from "../../db/db"
import { Videos } from "../../../generated/tableTypes"
import { getOrderBy } from "../utils/getOrderBy"
import { getPageInfo } from "../utils/getPageInfo"
import { UserInputError } from "apollo-server-koa"

export const resolveVideoList: Resolver<
  VideoPaginationWithKeys,
  any,
  any,
  VideoQueriesListArgs
> = async (_, { input }) => {
  const { filter, sort, page = 0, perPage = 25 } = input

  if (perPage < 1) throw new UserInputError("perPage minimum value is 1.")
  if (perPage > 100) throw new UserInputError("perPage maximum value is 100.")
  if (page < 1) throw new UserInputError("page minimum value is 1.")

  const query = db<Videos>("videos")
    .fromRaw("videos as v, video_media as vm")
    .select({
      title: "v.title",
      description: db.raw("COALESCE(v.description, '')"),
      id: db.raw("v.id::text"),
      createdAt: "v.created_at",
      updatedAt: "v.updated_at",
      viewCount: "v.view_count",
      organizationId: "v.organization_id",
      mediaId: "v.media_id",
      duration: "vm.duration",
      url: db.raw("('/video/' || v.id::text)"),
    })
    .whereRaw("vm.id = v.media_id")
    .andWhere("v.published", true)
    .orderBy(getOrderBy(sort, "v."))
    .offset((page - 1) * perPage)
    .limit(perPage)

  let items

  if (filter) {
    items = await query.where("v.organization_id", filter.organizationId)
  } else items = await query

  const [{ count }] = await db.count<{ count: number }[]>("*").from("videos")

  const pageInfo = getPageInfo(count, Math.trunc(page), Math.trunc(perPage))

  return {
    items,
    pageInfo,
  }
}
