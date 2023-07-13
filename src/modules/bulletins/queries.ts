import { createColumnOrdering } from "../core/helpers/createColumnOrdering"
import { InferOrderingParams } from "../db/types/Ordering"
import { DefaultQueryOptions, QueryTemplate } from "../db/classes/QueryTemplate"
import { bulletinModel } from "./model"
import { getAliasedColumns } from "../db/helpers/getAliasedColumns"
import { applyOrdering } from "../db/helpers/applyOrdering"
import { db } from "../db/db"

export const bulletinOrdering = [createColumnOrdering("date", "bulletins.created_at")]

export type BulletinQueryParams = InferOrderingParams<typeof bulletinOrdering> & {
  editor?: number
}

export const bulletinQuery = new QueryTemplate<DefaultQueryOptions & BulletinQueryParams>(
  {
    build: async (context) => {
      const { query, options } = context

      if (options.editor) {
        query.where("bulletins.editor_id", options.editor)
      }

      if (!options.count) {
        applyOrdering(bulletinOrdering, query, options)
      }
    },
    prepare: () => {
      return db.select(
        getAliasedColumns({
          columns: bulletinModel.columns,
          table: bulletinModel.tableName,
          aliasPrefix: "bulletin",
        }),
      )
    },
  },
)
