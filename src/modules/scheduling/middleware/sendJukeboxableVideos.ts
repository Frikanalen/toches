import { Middleware } from "koa"
import { serializeVideo } from "../../video/helpers/serializeVideo"
import { getJukeboxableVideos } from "../helpers/getJukeboxableVideos"

export const sendJukeboxableVideos = (): Middleware => async (context, next) => {
  context.body = (await getJukeboxableVideos()).map((v) => serializeVideo(v))

  return next()
}
