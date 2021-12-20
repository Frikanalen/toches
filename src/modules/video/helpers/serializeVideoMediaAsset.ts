import { VideoMediaAssetData } from "../models/videoModel"

const getObjectURL = (locator: string) => {
  const [, bucket, ...rest] = locator.split(":")
  return `/${bucket}/${rest.join("")}`
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
