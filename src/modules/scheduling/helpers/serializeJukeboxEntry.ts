import { JukeboxEntryData } from "../types"
import { add } from "date-fns"
import { serializeVideo } from "../../video/helpers/serializeVideo"

export const serializeJukeboxEntry = (data: JukeboxEntryData) => {
  const { startsAt, video } = data

  const endsAt = add(new Date(startsAt), { seconds: video.duration })

  return {
    type: "jukebox",
    startsAt,
    endsAt: endsAt.toISOString(),
    video: serializeVideo(video),
  }
}
