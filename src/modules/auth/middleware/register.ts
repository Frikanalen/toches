import { Middleware } from "koa"
import { db } from "../../db/db"
import { createUser } from "../../user/helpers/createUser"
import { serializeUser } from "../../user/helpers/serializeUser"
import { userModel } from "../../user/models/userModel"
import { userSchema } from "../../user/schema/userSchema"

export const register = (): Middleware => async (context, next) => {
  const { body } = context.request

  const validatedUser = await userSchema.validate(body)

  const existing = await db
    .select()
    .from(userModel.tableName)
    .where("email", validatedUser.email)
    .first()

  if (existing) {
    context.throw(409, "Email already in use")
  }

  const user = await createUser(validatedUser)

  context.session!.user = user.id
  context.body = {
    message: "Successfully registered",
    user: serializeUser()(user),
  }

  return next()
}
