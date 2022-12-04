import { Middleware } from "koa"
import { createReadStream } from "fs"

export const getXMLTVHomePage: Middleware = async (context, next) => {
  context.type = "text/html"
  context.status = 200
  context.body = createReadStream("src/modules/epg/xmltv/landingPage.html")

  return next()
}
