import { Resolver, VideoImages } from "../../../generated/graphql"
import { VideoWithKeys } from "../types"
import { db } from "../../db/db"
import { VideoMediaAssets } from "../../../generated/tableTypes"
import { getObjectURL } from "../../video/helpers/serializeVideoMediaAsset"

const getAssetURL = async (mediaId: string, assetType: string) => {
  const path = await db<VideoMediaAssets>("video_media_assets")
    .select("locator", "type")
    .where("media_id", mediaId)
    .andWhere("type", assetType)
    .returning<any>("path")
    .first()

  if (!path) return undefined
  return getObjectURL(path.locator)
}

export const resolveVideoImages: Resolver<VideoImages, VideoWithKeys> = async (
  parent,
) => {
  const fallback = ""
  const thumbLarge = (await getAssetURL(parent.mediaId, "thumbnail-large")) || fallback
  const thumbMedium =
    (await getAssetURL(parent.mediaId, "thumbnail-medium")) || thumbLarge
  const thumbSmall = (await getAssetURL(parent.mediaId, "thumbnail-small")) || thumbMedium
  return {
    thumbLarge,
    thumbMedium,
    thumbSmall,
  }
}
