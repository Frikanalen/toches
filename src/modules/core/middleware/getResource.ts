import { Middleware, ParameterizedContext } from "koa"

export type GetResourceAction<D extends object> = (
  context: ParameterizedContext,
) => Promise<D | undefined>

// Adds resource to context.state or 404
export const getResource =
  <D extends object>(action: GetResourceAction<D>): Middleware =>
  async (context, next) => {
    const resource = await action(context)

    if (!resource) context.throw(404)

    context.state.resource = resource

    return next()
  }
