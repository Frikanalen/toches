import { VideoMediaAssetData } from "../models/videoModel"

export const getObjectURL = (locator?: string) => {
  if (typeof locator === "undefined") return undefined

  const [scheme, ...rest] = locator.split(":")

  if (scheme === "S3") {
    const [bucket, ...path] = rest
    return `/${bucket}/${path.join(":")}`
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
 *         type:
 *           type: string
 *         url:
 *           type: string
 *         metadata:
 *           type: object
 */
export const serializeVideoMediaAsset = (data: VideoMediaAssetData) => {
  const { type, locator, metadata } = data

  return {
    type,
    url: getObjectURL(locator),
    metadata,
  }
}
