import { db } from "../db/db"
import { ScheduleItem } from "../../generated/graphql"
import { areIntervalsOverlapping } from "date-fns"
import { compareAsc } from "date-fns"

export const getSchedule = async (startTime: Date, endTime: Date) => {
  const jukeboxItems = await db<ScheduleItem>("jukebox_entries")
    .select({
      id: "j.id",
      title: "v.title",
      startsAt: "j.starts_at",
      videoId: "j.video_id",
      description: "v.description",
      organization_id: "v.organization_id",
      organization_name: "o.name",
      duration: "duration",
      url: db.raw("('/video/' || j.video_id::text)"),
      type: db.raw("'jukebox'"),
      endsAt: db.raw("(starts_at + duration * INTERVAL '1 second')"),
      crid: db.raw("('crid://frikanalen.no/video/' || j.video_id)"),
    })
    .fromRaw("jukebox_entries as j, videos as v, video_media as vm, organizations as o")
    .whereRaw("v.id = j.video_id")
    .andWhereRaw("v.organization_id = o.id")
    .andWhereRaw("vm.id = v.media_id")
    .andWhere("starts_at", "<=", endTime.toISOString())
    .groupBy([
      "j.id",
      "vm.duration",
      "v.title",
      "v.description",
      "v.organization_id",
      "o.name",
    ])
    .havingRaw("(starts_at + duration * INTERVAL '1 second') >= ?", [
      startTime.toISOString(),
    ])
    .orderBy("starts_at")

  const liveProgrammes = await db
    .select(["title", "duration"])
    .select({
      id: "l.id",
      description: "l.description",
      organization_id: "organization_id",
      organization_name: "o.name",
      url: db.raw("'/'"),
      startsAt: "starts_at",
      liveId: "l.id",
      type: db.raw("'live'"),
      crid: db.raw("'crid://frikanalen.no/live/' || l.id"),
      endsAt: db.raw("(starts_at + duration * INTERVAL '1 second')"),
    })
    .fromRaw("live_programmes as l, organizations as o")
    .where("starts_at", "<=", endTime.toISOString())
    .andWhereRaw("l.organization_id = o.id")
    .groupBy(["l.id", "l.description", "o.name"])
    .havingRaw("(starts_at + duration * INTERVAL '1 second') >= ?", [
      startTime.toISOString(),
    ])

  // If a jukebox item overlaps with a live transmission, we delete the jukebox item
  const filteredJukeboxItems = jukeboxItems.filter(({ startsAt: start, endsAt: end }) => {
    const itemInterval = { start, end }

    return !liveProgrammes.find(({ startsAt: start, endsAt: end }) =>
      areIntervalsOverlapping({ start, end }, itemInterval),
    )
  })

  // Sort after merge
  const items = [...filteredJukeboxItems, ...liveProgrammes].sort((a, b) =>
    compareAsc(a.startsAt, b.startsAt),
  )

  return items
}
