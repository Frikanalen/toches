import { db } from "../../db/db"
import { userModel } from "../models/userModel"
import { ValidatedUpdatedUser } from "../schema/updateUserSchema"
import { getUser } from "./getUser"

export const updateUser = async (id: number, data: ValidatedUpdatedUser) => {
  await db
    .update({
      name: data.name,
    })
    .into(userModel.tableName)
    .where("id", id)

  return getUser(id)
}
