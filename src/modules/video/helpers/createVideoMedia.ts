import { db } from "../../db/db"
import { ValidatedVideoMedia } from "../schemas/videoMediaSchema"

export const createVideoMedia = async (data: ValidatedVideoMedia) => {
  const { fileName, locator, duration, metadata } = data

  const [{ id }] = await db
    .insert({
      file_name: fileName,
      locator,
      duration,
      metadata,
    })
    .into("video_media")
    .returning<{ id: number }[]>("id")

  return id
}
