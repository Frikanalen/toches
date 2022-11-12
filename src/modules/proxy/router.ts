import Router from "@koa/router"
import { IS_DEV } from "../core/constants"
import { UPLOAD_RECEIVER_PROXY, GRAPHICS_PROXY } from "./constant"
import { createProxy } from "./helper/createProxy"
import { log } from "../core/log"

const router = new Router()

if (IS_DEV) {
  log.info("Dev mode: Creating proxies to graphics and media-processor")
  createProxy("/upload", UPLOAD_RECEIVER_PROXY, router)
  createProxy("/graphics", GRAPHICS_PROXY, router)
}

export { router as proxyRouter }
