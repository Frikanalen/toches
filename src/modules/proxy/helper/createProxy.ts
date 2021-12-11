import Router from "@koa/router"
import { proxyRequest } from "../middleware/proxyRequest"

export const createProxy = (path: `/${string}`, host: string, router: Router) => {
  const middleware = proxyRequest(host, path)

  router.all(`${path}/(.*)`, middleware)
  router.all(path, middleware)
}
