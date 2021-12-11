import { Middleware, ParameterizedContext } from "koa"

export type UpdateAction<D> = (form: any, context: ParameterizedContext) => Promise<D>

export const updateResource =
  <D>(action: UpdateAction<D>): Middleware =>
  async (context, next) => {
    const resource = await action(context.state.validated, context)
    context.state.resource = resource
    context.state.status = 200

    return next()
  }
