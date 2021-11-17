import { serializeOrganization } from "../../organization/helpers/serializeOrganization"
import { VideoData } from "../models/videoModel"

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
  const { id, title, description, createdAt, updatedAt, organization, viewCount } = video

  return {
    id,
    title,
    description,
    createdAt,
    updatedAt,
    organization: serializeOrganization(organization),
    viewCount,
  }
}
