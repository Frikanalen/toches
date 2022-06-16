import { Permission } from "../access-control/types"

export const isOrganizationEditor: Permission = {
  name: "IS_ORGANIZATION_EDITOR",
  check: async (context) => {
    const { user, resource } = context.state

    if (user.id !== resource.editor.id)
      context.throw(403, "You must be the organization editor to do that")
  },
}
