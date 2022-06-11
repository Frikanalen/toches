import { Permission } from "../access-control/types"
import { getUser } from "./helpers/getUser"
import { hasPermission } from "../access-control/helpers/hasPermission"

export const isSelf: Permission = {
  name: "IS_SELF",
  check: async (context) => {
    const { user, resource } = context.state

    if (user.id !== resource.id) {
      return "You must be the user to do that"
    }
  },
}
export const isAdmin: Permission = {
  name: "ADMIN_PANEL",
  check: async (context) => {
    const { id } = context.state.user

    const user = await getUser(id, {withRoles: true} )

    if (!hasPermission(user.roles!.map((r) => r.name), "ADMIN_PANEL")) {
      return "You must be an administrator to do that"
    }
  },
}
