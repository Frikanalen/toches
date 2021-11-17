import { DefaultQueryOptions, QueryTemplate } from "../../db/classes/QueryTemplate"
import { Relationship } from "../../db/classes/Relationship"
import { db } from "../../db/db"
import { getAliasedColumns } from "../../db/helpers/getAliasedColumns"
import { organizationModel } from "../../organization/models/organizationModel"
import { organizationQuery } from "../../organization/queries/organizationQuery"
import { videoModel } from "../models/videoModel"

const organization = new Relationship({
  key: "videos.organization_id",
  model: organizationModel,
  template: organizationQuery,
})

export type VideoQueryParams = {}

export const videoQuery = new QueryTemplate<DefaultQueryOptions & VideoQueryParams>({
  build: async (context) => {
    const { query, options } = context

    if (!options.count) {
      organization.apply(query, {})
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
