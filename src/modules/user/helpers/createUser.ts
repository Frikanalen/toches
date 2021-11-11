import { ValidatedUser } from "../schema/userSchema"
import { db } from "../../db/db"
import { userModel } from "../models/userModel"
import { getUser } from "./getUser"
import { hashPassword } from "../../auth/helpers/hashPassword"

export const createUser = async (data: ValidatedUser) => {
  const { password, email, firstName, lastName } = data
  const hashed = await hashPassword(password)

  const [id] = await db
    .insert({
      email,
      password: hashed,
      first_name: firstName,
      last_name: lastName,
    })
    .into(userModel.tableName)
    .returning<number[]>("id")

  return getUser(id)
}
