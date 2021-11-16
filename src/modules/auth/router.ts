import Router from "@koa/router"
import { authenticate } from "./middleware/authenticate"
import { login } from "./middleware/login"
import { logout } from "./middleware/logout"
import { register } from "./middleware/register"
import { sendAuthenticatedUser } from "./middleware/sendAuthenticatedUser"
import { sendNewCSRFToken } from "./middleware/sendNewCSRFToken"
import { sendUserPermissionState } from "./middleware/sendUserPermissionState"

const router = new Router({
  prefix: "/auth",
})

router.post("/register", register(), sendNewCSRFToken())
router.post("/login", login(), sendNewCSRFToken())
router.post("/logout", logout())

router.get(
  "/user",
  authenticate({ withRoles: true }),
  sendUserPermissionState(),
  sendAuthenticatedUser(),
)

export { router as authRouter }
