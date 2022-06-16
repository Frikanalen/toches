import Router from "@koa/router"
import { requirePermissions } from "../access-control/middleware/checkPermission"
import { authenticate } from "../auth/middleware/authenticate"
import { getResource } from "../core/middleware/getResource"
import { sendResource } from "../core/middleware/sendResource"
import { updateResource } from "../core/middleware/updateResource"
import { validateSchema } from "../validation/middleware/validateSchema"
import { getUser } from "./helpers/getUser"
import { serializeUser } from "./helpers/serializeUser"
import { updateUser } from "./helpers/updateUser"
import { isSelf } from "./permissions"
import { updateUserSchema } from "./schema/updateUserSchema"

const router = new Router({
  prefix: "/users",
})

router.put(
  "/:id",
  authenticate({
    required: true,
  }),
  getResource((context) => getUser(context.params.id)),
  validateSchema(updateUserSchema),
  requirePermissions([isSelf]),
  updateResource((data, context) => updateUser(context.params.id, data)),
  sendResource(serializeUser()),
)

export { router as userRouter }
