import { db } from "../../db/db"
import { Resolver, VideoAsset } from "../../../generated/graphql"
import { VideoMediaAssets } from "../../../generated/tableTypes"
import { VideoWithDescendants } from "../types"

export const resolveVideoAssets: Resolver<
  Array<VideoAsset>,
  VideoWithDescendants
> = async (parent): Promise<Array<VideoAsset>> =>
  db<VideoMediaAssets>("video_media_assets")
    .select("locator", "type", {
      id: db.raw<string>("id::text"),
      path: db.raw<string>(
        "split_part(locator, ':', 2) || '/' || split_part(locator, ':', 3)",
      ),
    })
    .where("media_id", parent.mediaId)
