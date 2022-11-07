import { db } from "../../db/db"
import { ValidatedVideoMediaAsset } from "../schemas/videoMediaAssetSchema"

export const createVideoMediaAsset = async (
  media: number,
  data: ValidatedVideoMediaAsset,
) => {
  const { locator, type, metadata } = data

  // FIXME: Should probably check if the file is actually there

  const [id] = await db
    .insert({
      locator,
      type,
      metadata,
      media_id: media,
    })
    .into("video_media_assets")
    .returning<number[]>("id")

  return id
}
