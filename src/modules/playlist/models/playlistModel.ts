import { Model } from "../../db/classes/Model"
import { VideoData, videoModel } from "../../video/models/videoModel"

export type PlaylistData = {
  id: number

  title: string
  description: string

  videos: VideoData[]
}

export const playlistModel = new Model<PlaylistData>({
  tableName: "playlists",
  columns: ["id", "title", "description"],
  structure: {
    prefix: "playlist",
    property: "playlist",
    subqueries: {
      videos: videoModel.structure,
    },
  },
})
