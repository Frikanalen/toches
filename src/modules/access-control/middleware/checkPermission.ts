import { Middleware } from "koa"
import { HttpError } from "../../core/classes/HttpError"
import { Permission } from "../types"

export const checkPermissions =
  (permissions: Permission[]): Middleware =>
  async (context, next) => {
    const results = await Promise.all(permissions.map((p) => p.check(context)))
    const errors = results.filter((r) => r) as string[]

    if (errors.length === 0) {
      return next()
    }

    throw new HttpError(403, "Permission denied", errors)
  }
