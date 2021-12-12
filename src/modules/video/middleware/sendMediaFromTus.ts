import { Middleware } from "koa"
import { db } from "../../db/db"

export const sendMediaFromTus = (): Middleware => async (context, next) => {
  const { params } = context

  const [video_media_id] = await db("tus_media_map")
    .select("video_media_id")
    .where({ tus_upload_id: params.key })

  console.log(video_media_id)
  if (video_media_id) context.body = video_media_id

  return next()
}
