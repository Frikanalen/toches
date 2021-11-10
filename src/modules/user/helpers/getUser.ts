import { db } from "../../db/db"
import { getAliasedColumns } from "../../db/helpers/getAliasedColumns"
import { userModel } from "../models/userModel"

export const getUser = async (id: number) => {
  const query = db
    .select(
      getAliasedColumns({
        columns: userModel.columns,
        table: userModel.tableName,
        prefix: "user",
      }),
    )
    .from(userModel.tableName)
    .where("id", id)
    .first()

  const [user] = await userModel.parseFromQuery(query)
  return user
}
