import Router from "@koa/router"
import { authenticate } from "./middleware/authenticate"
import { login } from "./middleware/login"
import { logout } from "./middleware/logout"
import { register } from "./middleware/register"
import { sendAuthenticatedUser } from "./middleware/sendAuthenticatedUser"
import { sendCSRFToken } from "./middleware/sendCSRFToken"
import { sendUserPermissionState } from "./middleware/sendUserPermissionState"

const router = new Router({
  prefix: "/auth",
})

router.post("/login", sendCSRFToken(), login())
router.post("/logout", logout())
router.post("/register", register())

router.get(
  "/user",
  authenticate({ withRoles: true }),
  sendUserPermissionState(),
  sendAuthenticatedUser(),
)

export { router as authRouter }
