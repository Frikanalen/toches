import { MEDIA_SERVER_BASE_URL } from "../../core/constants"
import { VideoMediaAssetData } from "../models/videoModel"

const getObjectURL = (locator: string) => {
  const [, bucket, ...rest] = locator.split(":")
  return `${MEDIA_SERVER_BASE_URL}/${bucket}/${rest.join("")}`
}

export const serializeVideoMediaAsset = (data: VideoMediaAssetData) => {
  const { type, locator, metadata } = data

  return {
    type,
    url: getObjectURL(locator),
    metadata,
  }
}
