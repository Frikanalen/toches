import { MEDIA_SERVER_BASE_URL } from "../../core/constants"
import { VideoMediaAssetData } from "../models/videoModel"

export const getObjectURL = (locator?: string) => {
  if (typeof locator === "undefined") return undefined

  const [scheme, ...rest] = locator.split(":")

  if (scheme === "S3") {
    const [bucket, ...path] = rest
    return `${MEDIA_SERVER_BASE_URL}/${bucket}/${path.join(":")}`
  } else if (scheme === "legacy") {
    return "https://upload.frikanalen.no/media/" + rest.join(":")
  }
  throw new Error(`don't know how to make url from scheme "${scheme}"`)
}

/**
 * @openapi
 * components:
 *   schemas:
 *     VideoMediaAsset:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *         type:
 *           type: string
 *         url:
 *           type: string
 *         metadata:
 *           type: object
 *       required:
 *        - id
 *        - type
 *        - url
 */
export const serializeVideoMediaAsset = (data: VideoMediaAssetData) => {
  const { type, locator, metadata, id } = data

  return {
    id,
    type,
    url: getObjectURL(locator),
    metadata,
  }
}
