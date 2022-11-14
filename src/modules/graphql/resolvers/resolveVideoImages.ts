import { Resolver, VideoImages } from "../../../generated/graphql"
import { VideoWithKeys } from "../types"
import { db } from "../../db/db"
import { VideoMediaAssets } from "../../../generated/tableTypes"
import { getObjectURL } from "../../video/helpers/serializeVideoMediaAsset"

export const resolveVideoImages: Resolver<VideoImages, VideoWithKeys> = async ({
  mediaId,
}) => {
  const dbAssets = await db<VideoMediaAssets>("video_media_assets")
    .select("locator", "type")
    .where("media_id", mediaId)
    .andWhereLike("type", "thumbnail%")

  const thumbsInDb = Object.assign(
    {},
    ...dbAssets.map(({ locator, type }) => ({ [type]: locator })),
  )

  const fallback = ""
  const thumbLarge = getObjectURL(thumbsInDb["thumbnail-large"]) || fallback
  const thumbMedium = getObjectURL(thumbsInDb["thumbnail-medium"]) || thumbLarge
  const thumbSmall = getObjectURL(thumbsInDb["thumbnail-small"]) || thumbMedium

  return {
    thumbLarge,
    thumbMedium,
    thumbSmall,
  }
}
