import { db } from "../../db/db"

export const getVideoAsset = async (parent: any) => {
  const { media_id } = await db("videos")
    .select("media_id")
    .where("id", parent.id)
    .first()

  const assets = await db
    .select(["id", "locator", "type"])
    .from("video_media_assets")
    .where({ media_id: media_id })

  return assets.map((a) => {
    const [method, bucket, path] = a.locator.split(":")
    return {
      ...a,
      path: `${bucket}/${path}`,
    }
  })
}
