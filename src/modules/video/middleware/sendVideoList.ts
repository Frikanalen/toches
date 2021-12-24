import { number } from "yup"
import { object } from "yup"
import { sendResourceList } from "../../core/middleware/sendResourceList"
import { createOrderingSchema } from "../../validation/helpers/createOrderingSchema"
import { getVideoList } from "../helpers/getVideoList"
import { serializeVideo } from "../helpers/serializeVideo"
import { videoOrdering } from "../queries/videoQuery"

const test = createOrderingSchema(videoOrdering)

export const sendVideoList = () =>
  sendResourceList(async (options) => {
    const { offset, limit, context } = options

    const query = await object({
      inPlaylist: number(),
      organization: number(),
    })
      .concat(createOrderingSchema(videoOrdering))
      .validate(context.query)

    return getVideoList({ offset, limit, ...query })
  }, serializeVideo)
