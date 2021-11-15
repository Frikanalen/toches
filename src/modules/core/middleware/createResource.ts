import { Middleware, ParameterizedContext } from "koa"

export type CreateAction<D extends object> = (
  form: any,
  context: ParameterizedContext,
) => Promise<D>

export const createResource =
  <D extends object>(action: CreateAction<D>): Middleware =>
  async (context, next) => {
    const resource = await action(context.state.validated, context)
    context.state.resource = resource

    return next()
  }
