import { add, startOfToday } from "date-fns"
import { QueryScheduleArgs, Resolver, ScheduleFilter } from "../../../generated/graphql"
import { date, object } from "yup"
import { UserInputError } from "apollo-server-koa"
import { db } from "../../db/db"
import { getPageInfo } from "../utils/getPageInfo"
import { ScheduleItemWithKeys, SchedulePaginationWithKeys, VideoWithKeys } from "../types"
import { getSchedule } from "../../epg/common/getSchedule"

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
  const { from, to = add(from, { days: 1 }) } = await parseFilterArg(args.filter)

  try {
    const items = await getSchedule({ start: from, end: to })

    const { page = 1, perPage = items.length } = args

    const pageInfo = getPageInfo(items.length, Math.trunc(page), Math.trunc(perPage))

    return {
      items,
      pageInfo,
    }
  } catch (e: any) {
    console.log(e)
    throw e
  }
}

export const resolveScheduleVideo: Resolver<
  VideoWithKeys,
  ScheduleItemWithKeys
> = async ({ id, videoId, liveId }) => {
  if (liveId) {
    return await db("live_programmes")
      .select("description", "title", {
        id: db.raw("id::text"),
        createdAt: "created_at",
        updatedAt: "updated_at",
        organizationId: "organization_id",
        url: db.raw("'/'"),
        __typeName: db.raw("'LiveVideo'"),
      })
      .where("id", liveId)
      .first()
  }

  if (!videoId)
    throw new Error(`resolveVideo: Parent ID ${id} has bogus video ID ${videoId}!`)

  const video = await db("videos")
    .select("id")
    .select("description", "title", {
      url: db.raw("'/video/' || id::text"),
      createdAt: "created_at",
      updatedAt: "updated_at",
      viewCount: "view_count",
      organizationId: "organization_id",
      mediaId: "media_id",
      __typeName: db.raw("'Video'"),
    })
    .where("id", videoId)
    .first()

  video.id = video.id.toString()

  return video
}
