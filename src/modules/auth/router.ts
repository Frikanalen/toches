import Router from "@koa/router"

const router = new Router({
  prefix: "/auth",
})

export { router as authRouter }
