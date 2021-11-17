import { sendResourceList } from "../../core/middleware/sendResourceList"
import { getVideoList } from "../helpers/getVideoList"
import { serializeVideo } from "../helpers/serializeVideo"

export const sendVideoList = () =>
  sendResourceList(async (options) => {
    const { offset, limit } = options
    return getVideoList({ offset, limit })
  }, serializeVideo)
