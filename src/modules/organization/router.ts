import Router from "@koa/router"
import { authenticate } from "../auth/middleware/authenticate"
import { createResource } from "../core/middleware/createResource"
import { getResource } from "../core/middleware/getResource"
import { sendResource } from "../core/middleware/sendResource"
import { validateSchema } from "../validation/middleware/validateSchema"
import { createOrganization } from "./helpers/createOrganization"
import { getOrganization } from "./helpers/getOrganization"
import { serializeOrganization } from "./helpers/serializeOrganization"
import { sendOrganizationList } from "./middleware/sendOrganizationList"
import { organizationSchema } from "./schemas/organizationSchema"

const router = new Router({
  prefix: "/organizations",
})

router.post(
  "/",
  authenticate({ required: true }),
  validateSchema(organizationSchema),
  createResource((data, context) => createOrganization(data, context.state.user.id)),
  sendResource(serializeOrganization),
)

router.get("/", sendOrganizationList())

router.get(
  "/:id",
  getResource((context) => getOrganization(context.params.id)),
  sendResource(serializeOrganization),
)

export { router as organizationRouter }
