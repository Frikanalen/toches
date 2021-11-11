import Router from "@koa/router"
import { authenticate } from "./middleware/authenticate"
import { login } from "./middleware/login"
import { logout } from "./middleware/logout"
import { register } from "./middleware/register"
import { sendAuthenticatedUser } from "./middleware/sendAuthenticatedUser"

const router = new Router({
  prefix: "/auth",
})

router.post("/login", login())
router.post("/logout", logout())
router.post("/register", register())
router.get("/user", authenticate(), sendAuthenticatedUser())

export { router as authRouter }
