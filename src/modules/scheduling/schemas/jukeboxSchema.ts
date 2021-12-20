import { array, InferType, number, object, string } from "yup"

/**
 * @openapi
 * components:
 *   schemas:
 *     JukeboxSchedule:
 *       type: object
 *       properties:
 *         from:
 *           type: string
 *           format: date-time
 *         to:
 *           type: string
 *           format: date-time
 *         entries:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               video:
 *                 type: number
 *               startsAt:
 *                 type: string
 *                 format: date-time
 *             required:
 *               - video
 *               - startsAt
 *       required:
 *         - from
 *         - to
 *         - entries
 */
export const jukeboxSchema = object({
  from: string().required(),
  to: string().required(),
  entries: array(
    object({
      video: number().required(),
      startsAt: string().required(),
    }),
  ).required(),
})

export type ValidatedJukebox = InferType<typeof jukeboxSchema>
