import { Middleware } from "koa"
import { createReadStream } from "fs"

export const getXMLTVHomePage: Middleware = async (context, next) => {
  // We need the trailing slash for the relative URLs to work
  if (!context.path.endsWith("/")) {
    const { request, response } = context

    response.status = 302
    return response.redirect(request.originalUrl + "/")
  }

  context.type = "text/html"
  context.status = 200
  context.body = createReadStream("src/modules/epg/xmltv/landingPage.html")

  return next()
}
