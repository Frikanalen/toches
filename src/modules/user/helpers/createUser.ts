import { ValidatedUser } from "../schema/userSchema"
import bcrypt from "bcrypt"
import { db } from "../../db/db"
import { userModel } from "../models/userModel"
import { getUser } from "./getUser"

const COST_FACTOR = 12

export const createUser = async (data: ValidatedUser) => {
  const { password, email, firstName, lastName } = data
  const hashed = await bcrypt.hash(password, COST_FACTOR)

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
