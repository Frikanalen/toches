import { fkweb } from "./fkwebDatabase"
import { FkVideo, FkVideofile, VideoMedia, VideoMediaAssets } from "../tableTypes"
import { db } from "../db"
import path from "path"

enum LegacyVideoTypes {
  "large_thumb" = 1,
  "broadcast" = 2,
  "vc1" = 3,
  "med_thumb" = 4,
  "small_thumb" = 5,
  "original" = 6,
  "theora" = 7,
  "srt" = 8,
  "cloudflare_id" = 9,
}

const newVideoTypes: Record<number, string> = {
  [LegacyVideoTypes.large_thumb]: "thumbnail-large",
  [LegacyVideoTypes.med_thumb]: "thumbnail-medium",
  [LegacyVideoTypes.small_thumb]: "thumbnail-small",
  [LegacyVideoTypes.theora]: "webm",
}

export const getOriginalIds = async (): Promise<Record<number, number>> => {
  const files = await fkweb<FkVideofile>("fk_videofile")

  const mappings: Record<number, number> = {}

  files
    .filter(({ format_id }) => format_id === LegacyVideoTypes.broadcast)
    .forEach(({ video_id, id }) => (mappings[video_id] = id))

  files
    .filter(({ format_id }) => format_id === LegacyVideoTypes.original)
    .forEach(({ video_id, id }) => (mappings[video_id] = id))

  return mappings
}

export const getDurations = async (): Promise<Record<number, number>> => {
  const videos = await fkweb<FkVideo>("fk_video")
    .select("id")
    .select({ duration: fkweb.raw("EXTRACT(EPOCH from DURATION)") })

  const mappings: Record<number, number> = {}

  videos.forEach(({ duration, id }) => (mappings[id] = duration))

  return mappings
}

export const migrateVideoFiles = async () => {
  const query = await fkweb<FkVideofile>("fk_videofile")
  const originals = await getOriginalIds()
  const durations = await getDurations()

  await Promise.all(
    query
      .filter(({ video_id, id }) => originals[video_id] === id)
      .map(
        async ({
          created_time,
          filename,
          format_id,
          id,
          integrated_lufs,
          truepeak_lufs,
          video_id,
        }) => {
          try {
            await db<VideoMedia>("video_media").insert({
              file_name: path.basename(filename),
              locator: `legacy:${filename}`,
              id,
              duration: durations[video_id],
              metadata: {},
            })
          } catch (e) {
            console.log("skipping videofile")
            console.log(e)
            throw e
          }
        },
      ),
  )

  await Promise.all(
    query
      .filter(({ video_id, id }) => originals[video_id] !== id)
      .map(
        async ({
          created_time,
          filename,
          format_id,
          id,
          integrated_lufs,
          truepeak_lufs,
          video_id,
        }) => {
          if (!newVideoTypes[format_id]) {
            console.log("Skipping videoFile with unsupported format ID")
            return
          }
          if (!originals[video_id]) return
          try {
            await db<VideoMediaAssets>("video_media_assets").insert({
              locator: `legacy:${filename}`,
              id,
              metadata: {},
              media_id: originals[video_id],
              type: newVideoTypes[format_id],
            })
          } catch (e) {
            console.log("skipping videofile")
            console.log(e)
            throw e
          }
        },
      ),
  )
}
