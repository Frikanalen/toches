import { Logger } from "tslog"
import { Middleware } from "koa"

export const log = new Logger()

export const requestLogger = (): Middleware => async (context, next) => {
  const startTime = Date.now()
  const foo = await next()
  const endTime = Date.now()
  const duration = endTime - startTime

  const { method, url, status, body, length } = context

  // noinspection MagicNumberJS
  if (status >= 500) {
    log.error(`${method} ${url} ${status} ${duration}ms`, {
      duration,
      status,
      method,
      url,
      length,
      parameters: context.request.body,
      errorBody: body?.message,
    })
  } else {
    // noinspection MagicNumberJS
    if (status >= 400) {
      log.warn(`${method} ${url} ${status} ${duration}ms`, {
        duration,
        status,
        method,
        url,
        length,
        parameters: context.request.body,
        errorBody: body?.message,
      })
    } else {
      log.info(`${method} ${url} ${status} ${duration}ms`, {
        duration,
        status,
        method,
        url,
        length,
      })
    }
  }

  return foo
}
