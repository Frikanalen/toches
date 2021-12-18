import { DefaultQueryOptions, QueryTemplate } from "../../db/classes/QueryTemplate"
import { Relationship } from "../../db/classes/Relationship"
import { db } from "../../db/db"
import { getAliasedColumns } from "../../db/helpers/getAliasedColumns"
import { getArrayFromSubquery } from "../../db/helpers/getArrayFromSubquery"
import { organizationModel } from "../../organization/models/organizationModel"
import { organizationQuery } from "../../organization/queries/organizationQuery"
import { videoModel } from "../models/videoModel"

const organization = new Relationship({
  key: "videos.organization_id",
  model: organizationModel,
  template: organizationQuery,
})

export type VideoQueryParams = {
  inPlaylist?: number
}

export const videoQuery = new QueryTemplate<DefaultQueryOptions & VideoQueryParams>({
  build: async (context) => {
    const { query, options } = context

    if (options.inPlaylist) {
      query
        .join("playlist_entries", "playlist_entries.video_id", "videos.id")
        .where("playlist_entries.playlist_id", options.inPlaylist)

      if (!options.count) {
        query.orderBy("playlist_entries.index")
      }
    }

    if (!options.count) {
      organization.apply(query, {})

      const assetSubquery = db
        .select(["id", "type", "locator", "metadata"])
        .from("video_media_assets")
        .whereRaw("video_media_assets.media_id = videos.media_id")

      query.select(getArrayFromSubquery(assetSubquery, "video__assets"))

      const categorySubquery = db
        .select("id")
        .from("video_category_map")
        .whereRaw("video_category_map.video_id = videos.id")

      query.select(getArrayFromSubquery(categorySubquery, "video__categories"))
    }
  },
  prepare: () => {
    const query = db.select(
      getAliasedColumns({
        columns: videoModel.columns,
        table: videoModel.tableName,
        prefix: "video",
      }),
    )

    return query
  },
})
