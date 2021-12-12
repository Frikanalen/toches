import { Permission } from "../access-control/types"

export const isSelf: Permission = {
  name: "IS_SELF",
  check: async (context) => {
    const { user, resource } = context.state

    if (user.id !== resource.id) {
      return "You must be the user to do that"
    }
  },
}
