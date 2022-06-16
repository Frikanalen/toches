import { Permission } from "../access-control/types"
import { getUser } from "./helpers/getUser"
import { hasPermission } from "../access-control/helpers/hasPermission"

export const isSelf: Permission = {
  name: "IS_SELF",
  check: async (context) => {
    const { user, resource } = context.state

    if (user.id !== resource.id) {
      context.throw(403, "You must be the owner to do that")
    }
  },
}
export const isAdmin: Permission = {
  name: "ADMIN_PANEL",
  check: async (context) => {
    if (!context.state.user) context.throw(401)

    const { id } = context.state.user

    const user = await getUser(id, { withRoles: true })

    if (
      !hasPermission(
        user.roles!.map((r) => r.name),
        "ADMIN_PANEL",
      )
    ) {
      context.throw(403)
    }
  },
}
