import { Middleware } from "koa"
import { AnySchema } from "yup"

export const validateSchema =
  (schema: AnySchema): Middleware =>
  async (context, next) => {
    let data

    try {
      data = await schema.validate(context.request.body)
    } catch (error: any) {
      context.throw(400, error.toString())
    }

    context.state.validated = data
    return next()
  }
