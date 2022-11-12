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
  const knownVideos = (await db<Videos>("videos").select("id")).map(({ id }) => id)

  log.info(`Building and storing schedule`)
  await Promise.all(
    scheduleItems.map(async ({ id, video_id, starttime }) => {
      if (!video_id) {
        skippedBecauseVideoNull += 1
        return
      }
      if (!knownVideos.find((id) => id === video_id)) {
        skippedBecauseVideoDoesntExist += 1
        return
      }

      return db<JukeboxEntries>("jukebox_entries").insert({
        id,
        video_id,
        starts_at: starttime,
      })
    }),
  )
  log.warn(
    `${skippedBecauseVideoNull} schedule items were skipped because video_id was null`,
  )
  log.warn(
    `${skippedBecauseVideoDoesntExist} schedule items were skipped as they referred to non-existant videos`,
  )
  log.info(`Done.`)
}
