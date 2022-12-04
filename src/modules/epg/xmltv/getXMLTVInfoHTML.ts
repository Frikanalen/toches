import { Middleware } from "koa"
import { createReadStream } from "fs"

export const getXMLTVInfoHTML: Middleware = async (context, next) => {
  context.type = "text/html"
  context.status = 200
  context.body = createReadStream("src/modules/epg/xmltv/infoPage.html")

  return next()
}
