import { playlistModel } from "../models/playlistModel"
import { playlistQuery } from "../queries/playlistQuery"

export const getPlaylist = async (id: number) => {
  const [query] = await playlistQuery.prepare({ single: true })

  query.from(playlistModel.tableName).where("playlists.id", id).first()

  const [playlist] = await playlistModel.parseFromQuery(query)
  return playlist
}
