import { serializeOrganization } from "../../organization/helpers/serializeOrganization"
import { VideoData } from "../models/videoModel"
import { serializeVideoMediaAsset } from "./serializeVideoMediaAsset"

/**
 * @openapi
 * components:
 *   schemas:
 *     Video:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 26
 *         title:
 *           type: string
 *           example: Frikanelen Infoplakat
 *         description:
 *           type: string
 *         categories:
 *           type: array
 *           items:
 *             type: number
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         organization:
 *           $ref: '#/components/schemas/Organization'
 *         viewCount:
 *           type: number
 *
 */
export const serializeVideo = (video: VideoData) => {
  const {
    id,
    title,
    description,
    createdAt,
    updatedAt,
    organization,
    categories,
    assets,
    viewCount,
  } = video

  return {
    id,
    title,
    description,
    categories: categories.map((c) => c.id),
    createdAt,
    updatedAt,
    organization: serializeOrganization(organization),
    assets: assets.map((a) => serializeVideoMediaAsset(a)),
    viewCount,
  }
}
