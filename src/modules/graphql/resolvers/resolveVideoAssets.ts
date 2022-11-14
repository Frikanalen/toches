import { db } from "../../db/db"
import { Resolver, VideoAsset } from "../../../generated/graphql"
import { VideoMediaAssets } from "../../../generated/tableTypes"
import { VideoWithKeys } from "../types"
import { getObjectURL } from "../../video/helpers/serializeVideoMediaAsset"

export const resolveVideoAssets: Resolver<Array<VideoAsset>, VideoWithKeys> = async (
  parent,
): Promise<Array<VideoAsset>> => {
  const query = await db<VideoMediaAssets>("video_media_assets")
    .select("locator", "type", {
      id: db.raw<string>("id::text"),
    })
    .where("media_id", parent.mediaId)

  return query.map((asset) => ({ ...asset, path: getObjectURL(asset.locator)! }))
}
