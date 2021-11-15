import Router from "@koa/router"
import { checkPermissions } from "../access-control/middleware/checkPermission"
import { authenticate } from "../auth/middleware/authenticate"
import { createResource } from "../core/middleware/createResource"
import { getResource } from "../core/middleware/getResource"
import { sendResource } from "../core/middleware/sendResource"
import { validateSchema } from "../validation/middleware/validateSchema"
import { createOrganization } from "./helpers/createOrganization"
import { getOrganization } from "./helpers/getOrganization"
import { serializeOrganization } from "./helpers/serializeOrganization"
import { addOrganizationMember } from "./middleware/addOrganizationMember"
import { removeOrganizationMember } from "./middleware/removeOrganizationMember"
import { sendOrganizationList } from "./middleware/sendOrganizationList"
import { sendOrganizationMemberList } from "./middleware/sendOrganizationMemberList"
import { isOrganizationEditor } from "./permissions"
import { organizationSchema } from "./schemas/organizationSchema"

const router = new Router({
  prefix: "/organizations",
})

const organizationGetterMiddleware = getResource((context) =>
  getOrganization(context.params.id),
)

router.post(
  "/",
  authenticate({ required: true }),
  validateSchema(organizationSchema),
  createResource((data, context) => createOrganization(data, context.state.user.id)),
  sendResource(serializeOrganization),
)

router.get("/", sendOrganizationList())

router.get("/:id", organizationGetterMiddleware, sendResource(serializeOrganization))

// Member management
router.use(
  "/:id/members",
  authenticate({ required: true }),
  organizationGetterMiddleware,
  checkPermissions([isOrganizationEditor]),
)

router.get("/:id/members", sendOrganizationMemberList())
router.post("/:id/members", addOrganizationMember())
router.delete("/:id/members/:member", removeOrganizationMember())

export { router as organizationRouter }
