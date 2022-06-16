import { Middleware } from "koa"
import { Permission } from "../types"

export const requirePermissions =
  (permissions: Permission[]): Middleware =>
  async (context, next) => {
    await Promise.all(permissions.map((p) => p.check(context)))

    return next()
  }
