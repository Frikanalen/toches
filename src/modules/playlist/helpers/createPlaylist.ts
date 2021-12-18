import { db } from "../../db/db"
import { playlistModel } from "../models/playlistModel"
import { ValidatedPlaylist } from "../schemas/playlistSchema"
import { assignPlaylistVideos } from "./assignPlaylistVideos"
import { getPlaylist } from "./getPlaylist"

export const createPlaylist = async (data: ValidatedPlaylist, organization: number) => {
  const [id] = await db
    .insert({
      title: data.title,
      description: data.description,
      organization_id: organization,
    })
    .into(playlistModel.tableName)
    .returning<number[]>("id")

  await assignPlaylistVideos(id, data.videos)

  return getPlaylist(id)
}
