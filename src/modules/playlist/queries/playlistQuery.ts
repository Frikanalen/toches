import { DefaultQueryOptions, QueryTemplate } from "../../db/classes/QueryTemplate"
import { db } from "../../db/db"
import { getAliasedColumns } from "../../db/helpers/getAliasedColumns"
import { getArrayFromSubquery } from "../../db/helpers/getArrayFromSubquery"
import { videoQuery } from "../../video/queries/videoQuery"
import { playlistModel } from "../models/playlistModel"

export type PlaylistQueryParams = {
  organization?: number
}

export const playlistQuery = new QueryTemplate<DefaultQueryOptions & PlaylistQueryParams>(
  {
    build: async (context) => {
      const { query, options } = context

      if (options.organization) {
        query.where("playlists.organization_id", options.organization)
      }

      if (!options.count) {
        const [videoSubquery] = await videoQuery.prepare({ single: true })

        videoSubquery
          .from("videos")
          .limit(1)
          .join("playlist_entries", "playlist_entries.video_id", "videos.id")
          .whereRaw("playlist_entries.playlist_id = playlists.id")

        query.select(getArrayFromSubquery(videoSubquery, "playlist__videos"))
      }
    },
    prepare: () => {
      const query = db.select(
        getAliasedColumns({
          columns: playlistModel.columns,
          table: playlistModel.tableName,
          prefix: playlistModel.structure.prefix,
        }),
      )

      return query
    },
  },
)
