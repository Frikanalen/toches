import { HttpError } from "../../core/classes/HttpError"
import { db } from "../../db/db"
import { ValidatedJukebox } from "../schemas/jukeboxSchema"

export const addJukeboxEntries = async (jukebox: ValidatedJukebox) => {
  const { from, to, entries } = jukebox

  const existing = await db
    .count()
    .from("jukebox_entries")
    .where("starts_at", ">", from)
    .andWhere("starts_at", "<", to)
    .first<{ count: string }>()

  if (existing.count !== "0") {
    throw new HttpError(409)
  }

  const rows = entries.map((e) => ({
    video_id: e.video,
    starts_at: e.startsAt,
  }))

  await db.batchInsert("jukebox_entries", rows)
}
