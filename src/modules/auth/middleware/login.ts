import { Middleware } from "koa"
import { loginSchema } from "../schemas/loginSchema"
import { authenticateUser } from "../helpers/authenticateUser"

export const login = (): Middleware => async (context, next) => {
  const deny = async () => {
    context.throw(401, "Incorrect username or password")
  }

  const permit = (id: number) => {
    context.session!.user = id
    context.body = { message: "Successfully logged in" }

    return next()
  }

  const { body } = context.request

  const { email, password } = await loginSchema.validate(body)

  const userId = await authenticateUser(email, password)

  return userId ? permit(userId) : await deny()
}
