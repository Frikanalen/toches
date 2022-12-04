import { PresentationEventLive, ScheduleInterval } from "../epg/types"
import { db } from "../db/db"

// Get live schedule items from database and return them as programme presentation items
export const presentLiveItems = ({
  start,
  end,
}: ScheduleInterval): Promise<PresentationEventLive[]> =>
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
