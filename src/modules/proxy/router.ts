import Router from "@koa/router"
import { IS_DEV } from "../core/constants"
import { UPLOAD_RECEIVER_PROXY } from "./constant"
import { createProxy } from "./helper/createProxy"

const router = new Router()

if (IS_DEV) {
  createProxy("/upload/video", UPLOAD_RECEIVER_PROXY, router)
}

export { router as proxyRouter }
