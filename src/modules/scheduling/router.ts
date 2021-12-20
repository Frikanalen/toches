import Router from "@koa/router"
import { requireSecretKey } from "../auth/middleware/requireSecretKey"
import { validateSchema } from "../validation/middleware/validateSchema"
import { addJukeboxEntries } from "./helpers/addJukeboxEntries"
import { sendJukeboxableVideos } from "./middleware/sendJukeboxableVideos"
import { jukeboxSchema } from "./schemas/jukeboxSchema"

const router = new Router({
  prefix: "/scheduling",
})

router.get("/jukeboxable", requireSecretKey(), sendJukeboxableVideos())

router.post(
  "/jukebox",
  requireSecretKey(),
  validateSchema(jukeboxSchema),
  async (context, next) => {
    await addJukeboxEntries(context.state.validated)

    context.body = {
      message: "Entries added successfully",
    }

    return next()
  },
)

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
