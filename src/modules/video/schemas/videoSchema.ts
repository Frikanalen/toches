import { boolean, InferType, number, object, string } from "yup"
import { validateCategoryIds } from "../../category/helpers/validateCategoryIds"
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
 *           type: integer
 *         jukeboxable:
 *           type: boolean
 *         categories:
 *           type: array
 *           items:
 *             type: integer
 *       required:
 *         - title
 *         - mediaId
 */
export const videoSchema = object({
  title: string().required().max(255),
  description: string(),
  categories: validateCategoryIds().default([]),
  mediaId: validateMediaId(number().required()),
  jukeboxable: boolean().default(false),
})

export type ValidatedVideo = InferType<typeof videoSchema>
