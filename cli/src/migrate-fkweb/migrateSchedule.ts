import { fkweb } from "./fkwebDatabase"
import { FkScheduleitem, JukeboxEntries, Videos } from "../tableTypes"
import { db } from "../db"
import { log } from "./log"

export const migrateSchedule = async () => {
  // Lots of schedule items have video_id set to zero
  var skippedBecauseVideoNull = 0

  // We skip schedule items which refer to video IDs which have not carried over,
  // so until these functions are covered by the video migrate function, we just
  // skip them, and report the count at the end.
  var skippedBecauseVideoDoesntExist = 0

  log.warn("Deleting jukebox entries")
  await db("jukebox_entries").delete()

  log.info("Reading schedule items...")
  const scheduleItems = await fkweb<FkScheduleitem>("fk_scheduleitem").select([
    "id",
    "video_id",
    "starttime",
  ])
  log.info(`${scheduleItems.length} items read.`)

  log.info(`Building map of known videos`)
  const knownVideos = new Set(
    (await db<Videos>("videos").select("id")).map(({ id }) => id),
  )

  log.info(`Building schedule`)
  const entries = scheduleItems
    .filter(({ video_id }) => {
      if (!video_id) {
        skippedBecauseVideoNull += 1
        return false
      }
      const known = knownVideos.has(video_id)
      if (!known) {
        skippedBecauseVideoDoesntExist += 1
        return false
      }
      return true
    })
    .map(({ id, video_id, starttime: starts_at }) => ({
      id,
      video_id: video_id!,
      starts_at,
    }))

  log.info(`Inserting ${entries.length} schedule items`)
  await db.batchInsert("jukebox_entries", entries)
  log.warn(
    `${skippedBecauseVideoNull} schedule items were skipped because video_id was null`,
  )
  log.warn(
    `${skippedBecauseVideoDoesntExist} schedule items were skipped as they referred to non-existant videos`,
  )
  log.info(`Done.`)

  await db.raw(
    "SELECT setval('jukebox_entries_id_seq', (SELECT MAX(id) FROM jukebox_entries));",
  )
}
