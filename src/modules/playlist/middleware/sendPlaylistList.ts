import { number, object } from "yup"
import { sendResourceList } from "../../core/middleware/sendResourceList"
import { getPlaylistList } from "../helpers/getPlaylistList"
import { serializePlaylist } from "../helpers/serializePlaylist"

export const sendPlaylistList = () =>
  sendResourceList(async (options) => {
    const { offset, limit, context } = options

    const query = await object({
      organization: number(),
    }).validate(context.query)

    return getPlaylistList({ offset, limit, ...query })
  }, serializePlaylist)
