import { db } from "../../db/db"

export const assignPlaylistVideos = async (playlist: number, videos: number[]) => {
  await db.del().from("playlist_entries").where("playlist_id", playlist)

  const rows = videos.map((id, index) => ({
    index,
    playlist_id: playlist,
    video_id: id,
  }))

  await db.batchInsert("playlist_entries", rows)
}
