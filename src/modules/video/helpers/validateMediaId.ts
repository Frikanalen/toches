import { NumberSchema, ValidationError } from "yup"
import { db } from "../../db/db"

export const validateMediaId = (schema: NumberSchema) => {
  schema.test(async (value) => {
    if (!value) return true

    const media = await db.select("id").from("video_media").where("id", value).first()
    const video = await db
      .select("media_id")
      .from("videos")
      .where("media_id", value)
      .first()

    if (media && !video) return true
    throw new ValidationError("Invalid media id")
  })

  return schema
}
