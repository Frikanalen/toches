import { Middleware, ParameterizedContext } from "koa"
import { HttpError } from "../classes/HttpError"

export type GetResourceAction<D extends object> = (
  context: ParameterizedContext,
) => Promise<D | undefined>

export const getResource =
  <D extends object>(action: GetResourceAction<D>): Middleware =>
  async (context, next) => {
    const resource = await action(context)
    if (!resource) throw new HttpError(404)

    context.state.resource = resource
    return next()
  }
