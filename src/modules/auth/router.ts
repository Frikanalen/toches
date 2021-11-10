import Router from "@koa/router"
import { register } from "./middleware/register"

const router = new Router({
  prefix: "/auth",
})

router.post("/register", register())

export { router as authRouter }
