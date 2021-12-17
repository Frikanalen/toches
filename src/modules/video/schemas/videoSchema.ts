import { InferType, number, object, string } from "yup"
import { validateMediaId } from "../helpers/validateMediaId"

/**
 * @openapi
 * components:
 *   schemas:
 *     NewVideoForm:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         mediaId:
 *           type: number
 *       required:
 *         - title
 *         - mediaId
 */
export const videoSchema = object({
  title: string().required().max(255),
  description: string(),
  mediaId: validateMediaId(number().required()),
})

export type ValidatedVideo = InferType<typeof videoSchema>
