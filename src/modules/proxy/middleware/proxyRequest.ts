import { Middleware } from "koa"
import axios from "axios"

export const proxyRequest =
  (host: string, base: `/${string}`): Middleware =>
  async (context, next) => {
    const { method, path, query, headers } = context

    const safeHeaders = Object.fromEntries(
      Object.entries(headers).map(([key, value]) => {
        if (Array.isArray(value)) {
          return [key, value.join(" ")]
        }

        return [key, value]
      }) as any,
    )

    safeHeaders["X-Forwarded-Host"] = safeHeaders.host

    try {
      const response = await axios({
        validateStatus: () => true,
        method: method as any,
        url: host + path,
        data: context.req,
        params: query,
        headers: safeHeaders,
      })

      context.body = response.data
      context.status = response.status

      for (const [k, v] of Object.entries(response.headers)) context.set(k, v)

      return next()
    } catch {
      context.throw(500, "An error occurred proxying the request")
    }
  }
