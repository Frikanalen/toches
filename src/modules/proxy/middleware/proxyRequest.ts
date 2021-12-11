import { Middleware } from "koa"
import axios from "axios"
import { HttpError } from "../../core/classes/HttpError"

export const proxyRequest =
  (host: string, base: `/${string}`): Middleware =>
  async (context, next) => {
    const { method, path, query, headers, request } = context

    const safePath = path.replace(base, "")

    const safeHeaders = Object.fromEntries(
      Object.entries(headers).map(([key, value]) => {
        if (Array.isArray(value)) {
          return [key, value.join(" ")]
        }

        return [key, value]
      }) as any,
    )

    console.log({ safePath })

    console.log({ safeHeaders })

    try {
      const response = await axios({
        validateStatus: () => true,
        method: method as any,
        url: host + safePath,
        data: request.body,
        params: query,
        headers: safeHeaders,
      })

      context.body = response.data
      context.status = response.status

      return next()
    } catch {
      throw new HttpError(500, "An error occurred sending the request")
    }
  }
