import { sendResourceList } from "../../core/middleware/sendResourceList"
import { getPlaylistList } from "../helpers/getPlaylistList"
import { serializePlaylist } from "../helpers/serializePlaylist"

export const sendPlaylistList = () =>
  sendResourceList(async (options) => {
    const { offset, limit } = options
    return getPlaylistList({ offset, limit })
  }, serializePlaylist)
