import { DefaultQueryOptions, QueryTemplate } from "../../db/classes/QueryTemplate"
import { Relationship } from "../../db/classes/Relationship"
import { db } from "../../db/db"
import { getAliasedColumns } from "../../db/helpers/getAliasedColumns"
import { userModel } from "../../user/models/userModel"
import { userQuery } from "../../user/queries/userQuery"
import { organizationModel } from "../models/organizationModel"

const editor = new Relationship({
  key: "organizations.editor_id",
  model: userModel,
  template: userQuery,
})

export type OrganizationQueryParams = {
  editor?: number
}

export const organizationQuery = new QueryTemplate<
  DefaultQueryOptions & OrganizationQueryParams
>({
  build: async (context) => {
    const { query, options } = context

    if (options.editor) {
      query.where("organizations.editor_id", options.editor)
    }

    if (!options.count) {
      editor.apply(query, {})
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
