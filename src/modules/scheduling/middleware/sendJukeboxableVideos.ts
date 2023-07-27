import { Middleware } from "koa"
import { serializeVideo } from "../../video/helpers/serializeVideo"
import { getJukeboxableVideos } from "../helpers/getJukeboxableVideos"

export const sendJukeboxableVideos = (): Middleware => async (context, next) => {
  //context.body = (await getJukeboxableVideos()).map((v) => serializeVideo(v))

  context.body = `<html><pre>${JSON.stringify(
    await getJukeboxableVideos(),
    null,
    2,
  )}</pre></html>`
  context.status = 200

  return next()
}
