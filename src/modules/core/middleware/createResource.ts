import { Middleware, ParameterizedContext } from "koa"

export type CreateAction<D> = (form: any, context: ParameterizedContext) => Promise<D>

export const createResource =
  <D>(action: CreateAction<D>): Middleware =>
  async (context, next) => {
    context.state.resource = await action(context.state.validated, context)
    context.status = 201

    return next()
  }
