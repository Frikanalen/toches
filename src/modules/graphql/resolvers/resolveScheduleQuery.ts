import { add, startOfToday } from "date-fns"
import {
  QueryScheduleArgs,
  Resolver,
  ScheduleFilter,
  SchedulePagination,
  Video,
} from "../../../generated/graphql"
import { date, object } from "yup"
import { UserInputError } from "apollo-server-koa"
import { db } from "../../db/db"
import { JukeboxEntries } from "../../../generated/tableTypes"
import { getPageInfo } from "../utils/getPageInfo"

const ScheduleFilterSchema = object({
  from: date().default(startOfToday()),
  to: date().when("from", (from: Date) => {
    return date()
      .default(add(from, { hours: 24 }))
      .max(add(from, { days: 7 }))
  }),
})

const parseFilterArg = async (filter: ScheduleFilter) => {
  try {
    return await ScheduleFilterSchema.validate(filter)
  } catch (e: any) {
    throw new UserInputError(e.toString())
  }
}

export const resolveScheduleQuery: Resolver<
  SchedulePagination,
  any,
  any,
  QueryScheduleArgs
> = async (parent, args, context, info) => {
  const { from, to } = await parseFilterArg(args.filter)
  const { page = 0, perPage = 25 } = args

  const items = await db
    .select("id", { startsAt: "starts_at" })
    .from("jukebox_entries")
    .where("starts_at", ">=", from.toISOString())
    .andWhere("starts_at", "<", to!.toISOString())
    .orderBy("starts_at")

  const pageInfo = getPageInfo(200, page, perPage)

  return {
    items,
    pageInfo,
  }
}

export const resolveVideo: Resolver<Video, { id?: string }> = async (
  parent,
  args,
  context,
  info,
) => {
  if (!parent.id) throw new Error(`resolveVideo called with bogus parent ID ${parent.id}`)

  const { videoId } =
    (await db<JukeboxEntries>("jukebox_entries")
      .select("id", { videoId: "video_id" })
      .where("id", "=", parent.id)
      .first()) || {}

  if (!videoId)
    throw new Error(`resolveVideo: Asked to get video for bogus parent id ${parent.id}`)

  const video = await db("videos")
    .select("id")
    .select("description", "media_id", "title", {
      createdAt: "created_at",
      updatedAt: "updated_at",
      viewCount: "view_count",
    })
    .where("id", "=", videoId)
    .first()

  if (!video?.id)
    throw new Error(`resolveVideo: Parent ID ${parent.id} has bogus video ID ${videoId}!`)

  video.id = video.id.toString()

  return video
}
