import { DefaultQueryOptions, QueryTemplate } from "../../db/classes/QueryTemplate"
import { db } from "../../db/db"
import { getAliasedColumns } from "../../db/helpers/getAliasedColumns"
import { userModel } from "../../user/models/userModel"
import { userQuery } from "../../user/queries/userQuery"
import { organizationModel } from "../models/organizationModel"

export type OrganizationQueryParams = {}

export const organizationQuery = new QueryTemplate<
  DefaultQueryOptions & OrganizationQueryParams
>({
  build: async (context) => {
    const { query, options } = context

    if (!options.count) {
      // Include editor in query
      query.select(
        getAliasedColumns({
          table: userModel.tableName,
          columns: userModel.columns,
          prefix: "user",
        }),
      )

      query.join("users", "users.id", "organizations.editor_id")
      userQuery.merge(context)
    }
  },
  prepare: () => {
    const query = db.select(
      getAliasedColumns({
        columns: organizationModel.columns,
        table: organizationModel.tableName,
        prefix: "organization",
      }),
    )

    return query
  },
})
