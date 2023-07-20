import { serializeOrganization } from "../../organization/helpers/serializeOrganization"
import { VideoData } from "../models/videoModel"
import { getObjectURL, serializeVideoMediaAsset } from "./serializeVideoMediaAsset"

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
 *         duration:
 *           type: number
 *         original:
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
 *         media:
 *           type: object
 *           properties:
 *             id:
 *               type: number
 *             assets:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/VideoMediaAsset'
 *           required:
 *             - id
 *             - assets
 *         viewCount:
 *           type: number
 *         jukeboxable:
 *           type: boolean
 *         published:
 *           type: boolean
 *       required:
 *         - id
 *         - title
 *         - description
 *         - duration
 *         - original
 *         - categories
 *         - createdAt
 *         - updatedAt
 *         - organization
 *         - media
 *         - viewCount
 *         - jukeboxable
 *         - published
 *
 */
export const serializeVideo = (video: VideoData) => {
  const {
    id,
    title,
    description,
    duration,
    createdAt,
    updatedAt,
    organization,
    mediaId,
    categories,
    assets,
    viewCount,
    original,
    jukeboxable,
    published,
  } = video

  return {
    id,
    title,
    description,
    duration,
    categories: categories.map((c) => c.id),
    createdAt,
    published,
    updatedAt,
    organization: serializeOrganization(organization),
    original: getObjectURL(original),
    media: {
      id: mediaId,
      assets: assets.map((a) => serializeVideoMediaAsset(a)),
    },
    viewCount,
    jukeboxable,
  }
}
