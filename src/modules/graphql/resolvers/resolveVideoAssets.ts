import { db } from "../../db/db"
import { Resolver, Video, VideoAsset } from "../../../generated/graphql"
import { VideoMediaAssets, Videos } from "../../../generated/tableTypes"
import { DeepPartial } from "utility-types"

export const resolveVideoAssets: Resolver<Array<VideoAsset>, DeepPartial<Video>> = async (
  parent,
): Promise<Array<VideoAsset>> => {
  if (!parent.id) throw new Error("resolveVideoAssets called with nullish parent ID!")

  const { mediaId } =
    (await db<Videos>("videos")
      .select({ mediaId: "media_id" })
      .where("id", parent.id)
      .first()) ?? {}

  if (!mediaId) throw new Error(`resolveVideoAssets got bogus videoId ${parent.id}`)

  const assets = await db<VideoMediaAssets>("video_media_assets")
    .select("id", "locator", "type")
    .where({ media_id: mediaId })

  return assets.map((a): VideoAsset => {
    const [_, bucket, path] = a.locator.split(":")
    return {
      ...a,
      id: a.id.toString(),
      path: `${bucket}/${path}`,
    }
  })
}
