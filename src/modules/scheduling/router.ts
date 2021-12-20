import Router from "@koa/router"
import { requireSecretKey } from "../auth/middleware/requireSecretKey"
import { validateSchema } from "../validation/middleware/validateSchema"
import { addJukeboxEntries } from "./helpers/addJukeboxEntries"
import { sendJukeboxableVideos } from "./middleware/sendJukeboxableVideos"
import { sendSchedule } from "./middleware/sendSchedule"
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

router.get("/entries", sendSchedule())

export { router as scheduleRouter }
