import { roleModel } from "../../access-control/models/roleModel"
import { DefaultQueryOptions, QueryTemplate } from "../../db/classes/QueryTemplate"
import { db } from "../../db/db"
import { getAliasedColumns } from "../../db/helpers/getAliasedColumns"
import { includeSubquery } from "../../db/helpers/includeSubquery"
import { userModel } from "../models/userModel"

export type UserQueryParams = {
  withRoles?: boolean
}

export const userQuery = new QueryTemplate<DefaultQueryOptions & UserQueryParams>({
  build: async (context) => {
    const { query, options } = context
    const { withRoles } = options

    if (withRoles) {
      const subquery = db
        .select(
          getAliasedColumns({
            columns: roleModel.columns,
            table: roleModel.tableName,
            aliasPrefix: "role",
          }),
        )
        .from(roleModel.tableName)
        .join("role_user_map", "role_user_map.role_id", "roles.id")
        .whereRaw("role_user_map.user_id = users.id")

      query.select(includeSubquery(subquery, "user__roles"))
    }
  },
  prepare: () =>
    db.select(
      getAliasedColumns({
        columns: userModel.columns,
        table: userModel.tableName,
        aliasPrefix: "user",
      }),
    ),
})
