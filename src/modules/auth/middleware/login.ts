import { Middleware } from "koa"
import { HttpError } from "../../core/classes/HttpError"
import { db } from "../../db/db"
import { userModel } from "../../user/models/userModel"
import { loginSchema } from "../schemas/loginSchema"

import { pbkdf2 } from "crypto"
import { promisify } from "util"
import { wait } from "../../lang/time"
import { comparePassword } from "../helpers/comparePassword"
import { hashPassword } from "../helpers/hashPassword"

const hashPbkdf2 = promisify(pbkdf2)

const throwInvalid = async () => {
  // Random delay to mitigate timing attacks
  await wait(Math.floor(Math.random() * 500))
  throw new HttpError(401, "Incorrect username or password", "invalid_credentials")
}

export const login = (): Middleware => async (context, next) => {
  const { body } = context.request
  const validatedLogin = await loginSchema.validate(body)

  const user = await db
    .select("id", "email", "password")
    .from(userModel.tableName)
    .where("email", validatedLogin.email)
    .first<{ id: number; email: string; password: string }>()

  const setSuccess = () => {
    context.session!.user = user.id
    context.body = { message: "Successfully logged in" }

    return next()
  }

  if (!user) {
    // Always return 401 so it's not clear if the email is in use or not
    await throwInvalid()
  }

  const [algorithm, iterations, salt, hash] = user.password.split("$")

  // Re-hash to bcrypt
  if (algorithm === "pbkdf2_sha256") {
    const buffer = await hashPbkdf2(
      validatedLogin.password,
      salt,
      Number(iterations),
      32,
      "SHA256",
    )

    const newHash = buffer.toString("base64")

    if (hash !== newHash) {
      await throwInvalid()
    }

    console.info(`Re-hashing password for ${user.email}`)

    const hashed = await hashPassword(validatedLogin.password)
    await db.update({ password: hashed }).into(userModel.tableName).where("id", user.id)

    return setSuccess()
  }

  const valid = await comparePassword(validatedLogin.password, user.password)
  if (!valid) {
    await throwInvalid()
  }

  return setSuccess()
}
