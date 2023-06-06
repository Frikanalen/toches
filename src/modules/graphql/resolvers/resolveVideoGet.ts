import { UserInputError } from "apollo-server-koa"
import { db } from "../../db/db"
import { Videos } from "../../../generated/tableTypes"
import { Resolver, VideoQueriesGetArgs } from "../../../generated/graphql"
import { VideoWithKeys } from "../types"
import { DatabaseKey } from "../utils/requireOrganizationEditor"

export const videoGet = async (videoId: DatabaseKey) => {
  if (!videoId) throw new Error("resolveVideoGet called with nullish id")

  return db<Videos>("videos")
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
    .where("v.id", videoId)
    .andWhereRaw("vm.id = v.media_id")
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
