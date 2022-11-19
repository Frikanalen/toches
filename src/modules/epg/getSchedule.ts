import { db } from "../db/db"
import { mergeSchedules } from "./mergeSchedules"
import { ScheduleEntryLive, ScheduleEntryVideo, ScheduleInterval } from "./types"

const selectJukeboxItems = async ({
  start,
  end,
}: ScheduleInterval): Promise<ScheduleEntryVideo[]> =>
  db<ScheduleEntryVideo>("jukebox_entries")
    .select({
      id: "j.id",
      title: "v.title",
      start: "j.starts_at",
      videoId: "j.video_id",
      description: "v.description",
      organization_id: "v.organization_id",
      organization_name: "o.name",
      duration: "duration",
      url: db.raw("('/video/' || j.video_id::text)"),
      type: db.raw("'jukebox'"),
      end: db.raw("(starts_at + duration * INTERVAL '1 second')"),
      crid: db.raw("('crid://frikanalen.no/video/' || j.video_id)"),
    })
    .fromRaw("jukebox_entries as j, videos as v, video_media as vm, organizations as o")
    .whereRaw("v.id = j.video_id")
    .andWhereRaw("v.organization_id = o.id")
    .andWhereRaw("vm.id = v.media_id")
    .andWhere("starts_at", "<=", end.toISOString())
    .groupBy([
      "j.id",
      "vm.duration",
      "v.title",
      "v.description",
      "v.organization_id",
      "o.name",
    ])
    .havingRaw("(starts_at + duration * INTERVAL '1 second') >= ?", [start.toISOString()])

const selectLiveItems = ({
  start,
  end,
}: ScheduleInterval): Promise<ScheduleEntryLive[]> =>
  db
    .select(["title", "duration"])
    .select({
      id: "l.id",
      description: "l.description",
      organization_id: "organization_id",
      organization_name: "o.name",
      url: db.raw("'/'"),
      start: "starts_at",
      liveId: "l.id",
      type: db.raw("'live'"),
      crid: db.raw("'crid://frikanalen.no/live/' || l.id"),
      end: db.raw("(starts_at + duration * INTERVAL '1 second')"),
    })
    .fromRaw("live_programmes as l, organizations as o")
    .where("starts_at", "<=", end.toISOString())
    .andWhereRaw("l.organization_id = o.id")
    .groupBy(["l.id", "l.description", "o.name"])
    .havingRaw("(starts_at + duration * INTERVAL '1 second') >= ?", [start.toISOString()])

export const getSchedule = async ({ start, end }: ScheduleInterval) => {
  const jukeboxItems = await selectJukeboxItems({ start, end })
  const liveProgrammes = await selectLiveItems({ start, end })

  return mergeSchedules(jukeboxItems, liveProgrammes)
}
