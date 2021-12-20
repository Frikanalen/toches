import { number } from "yup"
import { object } from "yup"
import { sendResourceList } from "../../core/middleware/sendResourceList"
import { getVideoList } from "../helpers/getVideoList"
import { serializeVideo } from "../helpers/serializeVideo"

export const sendVideoList = () =>
  sendResourceList(async (options) => {
    const { offset, limit, context } = options

    const query = await object({
      inPlaylist: number(),
      organization: number(),
    }).validate(context.query)

    return getVideoList({ offset, limit, ...query })
  }, serializeVideo)
