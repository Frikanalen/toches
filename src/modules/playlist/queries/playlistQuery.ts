import { DefaultQueryOptions, QueryTemplate } from "../../db/classes/QueryTemplate"
import { db } from "../../db/db"
import { getAliasedColumns } from "../../db/helpers/getAliasedColumns"
import { playlistModel } from "../models/playlistModel"

export type PlaylistQueryParams = {}

export const playlistQuery = new QueryTemplate<DefaultQueryOptions & PlaylistQueryParams>(
  {
    build: async (context) => {},
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
