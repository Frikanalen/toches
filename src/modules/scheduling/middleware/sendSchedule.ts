import { startOfToday, endOfDay, endOfWeek } from "date-fns"
import { Middleware } from "koa"
import { date } from "yup"
import { object } from "yup"
import { getJukeboxEntries } from "../helpers/getJukeboxEntries"
import { serializeJukeboxEntry } from "../helpers/serializeJukeboxEntry"

/**
 * @openapi
 * components:
 *   schemas:
 *     ScheduleEntry:
 *       type: object
 *       properties:
 *         type:
 *           type: string
 *           example: jukebox
 *         startsAt:
 *           type: string
 *           format: date-time
 *         endsAt:
 *           type: string
 *           format: date-time
 *         video:
 *           $ref: '#/components/schemas/Video'
 */
export const sendSchedule = (): Middleware => async (context, next) => {
  const { query } = context

  const { from, to } = await object({
    from: date().default(startOfToday()),
    to: date().when("from", (from: Date) => {
      return date().default(endOfDay(from)).max(endOfWeek(from))
    }),
  }).validate(query)

  const jukeboxEntries = await getJukeboxEntries(from.toISOString(), to!.toISOString())
  context.body = jukeboxEntries.map(serializeJukeboxEntry)

  return next()
}
