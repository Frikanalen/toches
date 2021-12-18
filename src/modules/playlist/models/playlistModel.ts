import { Model } from "../../db/classes/Model"

export type PlaylistData = {
  id: number

  title: string
  description: string
}

export const playlistModel = new Model<PlaylistData>({
  tableName: "playlists",
  columns: ["id", "title", "description"],
  structure: {
    prefix: "playlist",
    property: "playlist",
  },
})
