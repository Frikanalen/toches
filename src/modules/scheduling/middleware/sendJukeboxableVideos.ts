import { Middleware } from "koa"
import { serializeVideo } from "../../video/helpers/serializeVideo"
import { getJukeboxableVideos } from "../helpers/getJukeboxableVideos"

export const sendJukeboxableVideos = (): Middleware => async (context, next) => {
  const videos = (await getJukeboxableVideos()).map((v) => serializeVideo(v))
  context.body = videos

  return next()
}
