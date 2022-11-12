import { promisify } from "util"
import { pbkdf2 } from "crypto"
import { wait } from "../../lang/time"
import { userModel } from "../../user/models/userModel"
import { db } from "../../db/db"
import { Users } from "../../../generated/tableTypes"
import { comparePassword } from "./comparePassword"
import { hashPassword } from "./hashPassword"
import { log } from "../../core/log"

const hashPbkdf2 = promisify(pbkdf2)

const passwordIsLegacy = (password: string) => password.startsWith("pbkdf2_sha256$")

// Random delay to mitigate timing attacks
const timingAttackMitigationDelay = async () => {
  await wait(Math.floor(Math.random() * 500))
}

const checkWithLegacyHashAlgorithm = async (password: string, hashFromDb: string) => {
  const [source, iterations, salt, hash] = hashFromDb.split("$")

  const buffer = await hashPbkdf2(password, salt, Number(iterations), 32, "SHA256")

  const computedHash = buffer.toString("base64")

  return hash === computedHash
}

const storeBcryptHash = async (userId: number, password: string) => {
  const hashed = await hashPassword(password)
  await db.update({ password: hashed }).into(userModel.tableName).where("id", userId)
}

export const authenticateUser = async (
  email: string,
  password: string,
): Promise<number | null> => {
  const user = await db<Users>(userModel.tableName)
    .select("id", "email", "password", "banned")
    .where("email", email)
    .first()

  if (!user) {
    await timingAttackMitigationDelay()
    return null
  }

  if (user.banned) {
    return null
  }

  // Passwords set using Django are stored in this format, so we check against it,
  // and if successful re-hash the password with bcrypt and store it in the database.
  if (passwordIsLegacy(user.password)) {
    const valid = await checkWithLegacyHashAlgorithm(password, user.password)

    if (valid) {
      log.info(`Re-hashing password for ${user.email}`)
      await storeBcryptHash(user.id, password)
      return user.id
    } else {
      await timingAttackMitigationDelay()
      return null
    }
  }

  if (await comparePassword(password, user.password)) return user.id

  await timingAttackMitigationDelay()
  return null
}
