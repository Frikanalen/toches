import { add, startOfToday } from "date-fns"
import { Middleware } from "koa"
import * as yup from "yup"
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
 *       required:
 *         - type
 *         - startsAt
 *         - endsAt
 *         - video
 */
export const sendSchedule = (): Middleware => async (context, next) => {
  const { query } = context

  const { from, to } = await yup
    .object({
      from: yup.date().default(startOfToday()),
      to: yup
        .date()
        .when("from", ([from]: Date[], schema) =>
          schema.default(add(from, { hours: 24 })).max(add(from, { days: 7 })),
        ),
    })
    .validate(query)

  const jukeboxEntries = await getJukeboxEntries(from.toISOString(), to!.toISOString())
  context.body = jukeboxEntries.map(serializeJukeboxEntry)

  return next()
}
