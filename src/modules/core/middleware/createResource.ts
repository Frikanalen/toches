import { Middleware, ParameterizedContext } from "koa"

export type CreateAction<D> = (form: any, context: ParameterizedContext) => Promise<D>

export const createResource =
  <D>(action: CreateAction<D>): Middleware =>
  async (context, next) => {
    const resource = await action(context.state.validated, context)
    context.state.resource = resource
    context.state.status = 201

    return next()
  }
