import { PresentationEventVideo, ScheduleInterval } from "../epg/types"
import { db } from "../db/db"

// Get jukebox items from database and return them as programme presentation items
export const presentJukeboxItems = async ({
  start,
  end,
}: ScheduleInterval): Promise<PresentationEventVideo[]> =>
  db<PresentationEventVideo>("jukebox_entries")
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
