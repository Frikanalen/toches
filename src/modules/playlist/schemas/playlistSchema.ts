import { InferType, object, string } from "yup"
import { validateVideoIds } from "../../video/helpers/validateVideoIds"

/**
 * @openapi
 * components:
 *   schemas:
 *     NewPlaylistForm:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         videos:
 *           type: array
 *           items:
 *             type: number
 *       required:
 *         - title
 *         - description
 *         - videos
 */
export const playlistSchema = object({
  title: string().required().max(255),
  description: string(),
  videos: validateVideoIds().required(),
})

export type ValidatedPlaylist = InferType<typeof playlistSchema>
