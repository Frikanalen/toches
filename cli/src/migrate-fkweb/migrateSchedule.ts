import { fkweb } from "./fkwebDatabase"
import { FkScheduleitem, JukeboxEntries, Videos } from "../tableTypes"
import { db } from "../db"

export const migrateSchedule = async () => {
  await db("jukebox_entries").delete()

  const scheduleItems = await fkweb<FkScheduleitem>("fk_scheduleitem").select([
    "id",
    "video_id",
    "starttime",
  ])
  const knownVideos = (await db<Videos>("videos").select("id")).map(({ id }) => id)

  await Promise.all(
    scheduleItems.map(async ({ id, video_id, starttime }) => {
      if (!video_id) {
        console.log("skipping schedule entry as video_id is null")
        return
      }
      if (!knownVideos.find((id) => id === video_id)) {
        console.log(`skipping schedule entry as video ${id} doesn't exist`)
        return
      }

      return db<JukeboxEntries>("jukebox_entries").insert({
        id,
        video_id,
        starts_at: starttime,
      })
    }),
  )
}
