import { UserInputError } from "apollo-server-koa"
import { db } from "../../db/db"
import { Videos } from "../../../generated/tableTypes"
import { Resolver, VideoQueriesGetArgs } from "../../../generated/graphql"
import { VideoWithKeys } from "../types"

export const videoGet = async (videoId: string) => {
  if (!videoId) throw new Error("resolveVideoGet called with nullish id")

  return await db<Videos>("videos")
    .select("title", {
      description: db.raw("COALESCE(description, '')"),
      id: db.raw("id::text"),
      createdAt: "created_at",
      updatedAt: "updated_at",
      viewCount: "view_count",
      organizationId: "organization_id",
      mediaId: "media_id",
      url: db.raw("('/video/' || id::text)"),
    })
    .where("id", videoId)
    .first()
}

export const resolveVideoGet: Resolver<
  VideoWithKeys,
  any,
  any,
  VideoQueriesGetArgs
> = async (parent, { id }) => {
  const video = await videoGet(id)

  if (!video) throw new UserInputError(`Video ${id} does not exist`, { id })

  return video
}
