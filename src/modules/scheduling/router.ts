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

/**
 * @openapi
 * /scheduling/entries:
 *   get:
 *     tags:
 *       - Scheduling
 *     summary: Get a portion of the schedule
 *     operationId: getSchedule
 *     parameters:
 *       - in: query
 *         name: from
 *         description: Defaults to start of day.
 *         required: false
 *         schema:
 *           type: string
 *           format: date-time
 *       - in: query
 *         name: to
 *         description: Defaults to end of day of "from"
 *         required: false
 *         schema:
 *           type: string
 *           format: date-time
 *     responses:
 *       200:
 *         description: A schedule
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ScheduleEntry'
 */
router.get("/entries", sendSchedule())

/**3
 * @openapi
 * /scheduling/jukeboxable:
 *   get:
 *     tags:
 *       - Scheduling
 *     summary: Internally get the pool of jukeboxable videos
 *     responses:
 *       200:
 *         description: A list of videos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Video'
 */
router.get("/jukeboxable", requireSecretKey(), sendJukeboxableVideos())

/**
 * @openapi
 * /scheduling/jukebox:
 *   post:
 *     tags:
 *       - Scheduling
 *     summary: Internally create jukebox schedule
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/JukeboxSchedule'
 *     responses:
 *       200:
 *         description: Jukebox schedule was created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
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

export { router as scheduleRouter }
