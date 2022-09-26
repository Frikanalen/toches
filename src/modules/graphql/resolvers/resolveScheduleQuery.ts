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
import { DeepPartial } from "utility-types"

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
  DeepPartial<SchedulePagination>,
  any,
  any,
  QueryScheduleArgs
> = async (parent, args) => {
  const { from, to } = await parseFilterArg(args.filter)
  const { page = 0, perPage = 25 } = args

  const itemsFromDb = await db
    .select({ id: "j.id", startsAt: "j.starts_at", duration: "vm.duration" })
    .fromRaw("jukebox_entries as j, videos as v, video_media as vm")
    .whereRaw("v.id = j.video_id")
    .andWhereRaw("vm.id = v.media_id")
    .andWhere("starts_at", ">=", from.toISOString())
    .andWhere("starts_at", "<", to!.toISOString())
    .orderBy("starts_at")

  const items = itemsFromDb.map((item) => ({
    ...item,
    duration: undefined,
    endsAt: add(item.startsAt, { seconds: item.duration }),
  }))

  const pageInfo = getPageInfo(200, page, perPage)

  return {
    items,
    pageInfo,
  }
}

export const resolveVideo: Resolver<Video, { id?: string }> = async (parent) => {
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
