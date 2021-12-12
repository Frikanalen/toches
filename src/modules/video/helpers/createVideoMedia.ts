import { db } from "../../db/db"
import { ValidatedVideoMedia } from "../schemas/videoMediaSchema"

export const createVideoMedia = async (data: ValidatedVideoMedia) => {
  const { fileName, locator, duration, metadata, uploadId } = data

  console.log({ data })
  const [id] = await db
    .insert({
      file_name: fileName,
      locator,
      duration,
      metadata,
    })
    .into("video_media")
    .returning<number[]>("id")

  await db
    .insert({ video_media_id: id, tus_upload_id: uploadId })
    .into("tus_media_map")

  return id
}
