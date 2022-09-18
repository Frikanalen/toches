import bcrypt from "bcrypt"
import { BCRYPT_COST_FACTOR } from "../constants"

export const hashPassword = async (password: string) => {
  const hashed = await bcrypt.hash(password, BCRYPT_COST_FACTOR)
  return `bcrypt$${hashed}`
}
