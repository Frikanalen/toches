import { db } from "../../db/db"

export const assignVideoCategories = async (video: number, categories: number[]) => {
  await db.del("video_category_map").where("video_id", video)

  const rows = categories.map((id) => ({
    category_id: id,
    video_id: video,
  }))

  await db.batchInsert("video_category_map", rows)
}
