import { add, startOfToday } from "date-fns"
import {
  QueryScheduleArgs,
  Resolver,
  ScheduleFilter,
  ScheduleItem,
} from "../../../generated/graphql"
import { date, object } from "yup"
import { UserInputError } from "apollo-server-koa"
import { db } from "../../db/db"
import { getPageInfo } from "../utils/getPageInfo"
import { ScheduleItemWithKeys, SchedulePaginationWithKeys, VideoWithKeys } from "../types"

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
  SchedulePaginationWithKeys,
  any,
  any,
  QueryScheduleArgs
> = async (parent, args) => {
  const { from, to } = await parseFilterArg(args.filter)
  const { page = 0, perPage = 25 } = args

  const items = (await db<ScheduleItem>("jukebox_entries")
    .select({
      id: "j.id",
      startsAt: "j.starts_at",
      videoId: "j.video_id",
      endsAt: db.raw("(starts_at + duration * INTERVAL '1 second')"),
    })
    .fromRaw("jukebox_entries as j, videos as v, video_media as vm")
    .whereRaw("v.id = j.video_id")
    .andWhereRaw("vm.id = v.media_id")
    .andWhere("starts_at", ">=", from.toISOString())
    .andWhere("starts_at", "<", to!.toISOString())
    .orderBy("starts_at")) as ScheduleItemWithKeys[]

  const pageInfo = getPageInfo(200, page, perPage)

  return {
    items,
    pageInfo,
  }
}

export const resolveVideo: Resolver<VideoWithKeys, ScheduleItemWithKeys> = async (
  parent,
) => {
  const video = await db("videos")
    .select("id")
    .select("description", "title", {
      createdAt: "created_at",
      updatedAt: "updated_at",
      viewCount: "view_count",
      organizationId: "organization_id",
      mediaId: "media_id",
    })
    .where("id", parent.videoId)
    .first()

  if (!video?.id)
    throw new Error(
      `resolveVideo: Parent ID ${parent.id} has bogus video ID ${parent.videoId}!`,
    )

  video.id = video.id.toString()

  return video
}
