import { Resolver, VideoQueriesSearchArgs } from "../../../generated/graphql"
import { VideoSearchResultsWithKeys, VideoWithKeys } from "../types"
import { Videos } from "../../../generated/tableTypes"
import { db } from "../../db/db"

export const resolveVideoSearch: Resolver<
  VideoSearchResultsWithKeys,
  any,
  any,
  VideoQueriesSearchArgs
> = async (_, { input: { query, limit = 10 } }) => {
  const dbQuery = db<Videos>("videos")
    .select(["title"])
    .select({
      description: db.raw("COALESCE(description, '')"),
      id: db.raw("id::text"),
      createdAt: "created_at",
      updatedAt: "updated_at",
      viewCount: "view_count",
      organizationId: "organization_id",
      mediaId: "media_id",
    })
    .whereRaw("title || ' ' || description @@ plainto_tsquery('norwegian', ?)", query)
    .limit(Math.min(limit, 50))

  const videos = await dbQuery

  return {
    items: videos as VideoWithKeys[],
    count: videos.length,
  }
}
