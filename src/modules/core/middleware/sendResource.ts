import { Middleware } from "koa"

export const sendResource =
  (serialize: (data: any) => any): Middleware =>
  (context, next) => {
    const { resource } = context.state

    if (!resource) context.throw(500, "Resource missing from context state!")

    context.body = serialize(resource)

    return next()
  }
