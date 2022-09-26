import { UserInputError } from "apollo-server-koa"
import { db } from "../../db/db"
import { Videos } from "../../../generated/tableTypes"
import {
  QueryVideosArgs,
  Resolver,
  Video,
  VideoPagination,
} from "../../../generated/graphql"
import { getVideo } from "../../video/helpers/getVideo"
import { getPageInfo } from "../utils/getPageInfo"
import { getOrderBy } from "../utils/getOrderBy"
import { DeepPartial } from "utility-types"

export const resolveVideoQuery: Resolver<
  DeepPartial<Video>,
  any,
  any,
  { id: string }
> = async (parent, args) => {
  const id = parseInt(args.id)

  const video = await getVideo(id)

  if (!video) throw new UserInputError(`Video ${id} does not exist`, { id })

  const { title, updatedAt, createdAt, description } = video

  return {
    title,
    updatedAt,
    createdAt,
    description,
    id: args.id,
  }
}

// Count the rows of a given table
// TODO: Add filter option
const countRows = async (tableName: string): Promise<number> => {
  const data = await db(tableName).count({ rowCount: "*" })

  return parseInt(data[0]?.rowCount as string)
}

export const resolveVideosQuery: Resolver<
  DeepPartial<VideoPagination>,
  any,
  any,
  QueryVideosArgs
> = async (parent, args) => {
  const { filter, sort, page = 0, perPage = 25 } = args

  if (perPage < 1) throw new UserInputError("perPage minimum value is 1.")
  if (perPage > 100) throw new UserInputError("perPage maximum value is 100.")
  if (page < 1) throw new UserInputError("page minimum value is 1.")

  const query = db<Videos>("videos")
    .select("id", "description", "media_id", "title", {
      createdAt: "created_at",
      updatedAt: "updated_at",
      viewCount: "view_count",
    })
    .orderBy(getOrderBy(sort))
    .offset((page - 1) * perPage)
    .limit(perPage)

  let videos

  if (filter) {
    videos = await query.where("organization_id", filter.organizationId)
  } else videos = await query

  const items = videos.map(
    (v): DeepPartial<Video> => ({
      ...v,
      description: v.description ?? undefined,
      id: v.id.toString(),
    }),
  )

  const pageInfo = getPageInfo(await countRows("videos"), page, perPage)

  return {
    items,
    pageInfo,
  }
}
