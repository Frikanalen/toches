import Router from "@koa/router"
import { requireSecretKey } from "../auth/middleware/requireSecretKey"
import { sendJukeboxableVideos } from "./middleware/sendJukeboxableVideos"

const router = new Router({
  prefix: "/scheduling",
})

router.get("/jukeboxable", requireSecretKey(), sendJukeboxableVideos())

// Temporary mock route to get frontend working
router.get("/entries", (context, next) => {
  context.body = {
    rows: [],
    count: 0,
    offset: 0,
    limit: 5,
  }

  return next()
})

export { router as scheduleRouter }
