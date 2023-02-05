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
    .fromRaw("videos as v, video_media as vm")
    .select({
      title: "v.title",
      description: db.raw("COALESCE(v.description, '')"),
      id: db.raw("v.id::text"),
      createdAt: "v.created_at",
      updatedAt: "v.updated_at",
      viewCount: "v.view_count",
      organizationId: "v.organization_id",
      mediaId: "v.media_id",
      duration: "vm.duration",
      url: db.raw("('/video/' || v.id::text)"),
    })
    .whereRaw(
      "v.title || ' ' || v.description @@ websearch_to_tsquery('english', ?)",
      query,
    )
    .orWhereRaw(
      "v.title || ' ' || v.description @@ websearch_to_tsquery('norwegian', ?)",
      query,
    )
    .andWhereRaw("vm.id = v.media_id")
    .limit(Math.min(limit, 50))

  const videos = await dbQuery

  return {
    items: videos as VideoWithKeys[],
    count: videos.length,
  }
}
