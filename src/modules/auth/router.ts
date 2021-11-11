import Router from "@koa/router"
import { authenticate } from "./middleware/authenticate"
import { register } from "./middleware/register"
import { sendAuthenticatedUser } from "./middleware/sendAuthenticatedUser"

const router = new Router({
  prefix: "/auth",
})

router.post("/register", register())
router.get("/user", authenticate(), sendAuthenticatedUser())

export { router as authRouter }
