import { Resolver, VideoImages } from "../../../generated/graphql"
import { VideoWithKeys } from "../types"
import { db } from "../../db/db"
import { VideoMediaAssets } from "../../../generated/tableTypes"
import { MEDIA_SERVER_BASE_URL } from "../../core/constants"

const getAssetURL = async (mediaId: string, assetType: string) => {
  const path = await db<VideoMediaAssets>("video_media_assets")
    .select("locator", "type", {
      path: db.raw<string>(
        "split_part(locator, ':', 2) || '/' || split_part(locator, ':', 3)",
      ),
    })
    .where("media_id", mediaId)
    .andWhere("type", assetType)
    .returning<any>("path")
    .first()

  return MEDIA_SERVER_BASE_URL + "/" + path?.path!
}

export const resolveVideoImages: Resolver<VideoImages, VideoWithKeys> = async (
  parent,
) => ({
  thumbLarge: await getAssetURL(parent.mediaId, "thumbnail-large"),
  thumbMedium: await getAssetURL(parent.mediaId, "thumbnail-medium"),
  thumbSmall: await getAssetURL(parent.mediaId, "thumbnail-small"),
})
