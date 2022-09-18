import { UserInputError } from "apollo-server-koa"
import { db } from "../../db/db"
import { Videos } from "../../../generated/tableTypes"
import {
  InputMaybe,
  QueryVideosArgs,
  Resolver,
  Video,
  VideoPagination,
  VideoSort,
} from "../../../generated/graphql"
import { getVideo } from "../../video/helpers/getVideo"

export const resolveVideoQuery: Resolver<
  Partial<Video>,
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
const getPageInfo = (count: number, page: number, perPage: number) => ({
  hasNextPage: perPage * (page + 1) <= count,
  hasPreviousPage: page > 1,
  page: page,
  perPage: perPage,
  totalItems: count,
  totalPages: count / perPage,
})

type OrderBy = {
  column: string
  order?: "desc" | "asc"
  nulls?: "first" | "last"
}

const getOrderBy = (sorts?: InputMaybe<VideoSort[]>): OrderBy[] =>
  sorts?.map((sort): OrderBy => {
    switch (sort) {
      case VideoSort.DateAsc:
        return {
          column: "created_at",
          order: "asc",
        }
      case VideoSort.DateDesc:
        return {
          column: "created_at",
          order: "desc",
        }
    }
  }) || []
// Count the rows of a given table
// TODO: Add filter option
const countRows = async (tableName: string): Promise<number> => {
  const data = await db(tableName).count({ rowCount: "*" })

  return parseInt(data[0]?.rowCount as string)
}
export const resolveVideosQuery: Resolver<
  VideoPagination,
  any,
  any,
  QueryVideosArgs
> = async (parent, args) => {
  const { sort, page = 0, perPage = 25 } = args

  if (perPage < 1) throw new UserInputError("perPage minimum value is 1.")
  if (perPage > 100) throw new UserInputError("perPage maximum value is 100.")
  if (page < 1) throw new UserInputError("page minimum value is 1.")

  const videos = await db<Videos>("videos")
    .select("id", "description", "media_id", "title", {
      createdAt: "created_at",
      updatedAt: "updated_at",
      viewCount: "view_count",
    })
    .orderBy(getOrderBy(sort))
    .offset((page - 1) * perPage)
    .limit(perPage)

  const items = videos.map((v) => ({
    ...v,
    id: v.id.toString(),
  }))

  const pageInfo = getPageInfo(await countRows("videos"), page, perPage)

  return {
    items,
    pageInfo,
  }
}
