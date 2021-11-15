import { sendResourceList } from "../../core/middleware/sendResourceList"
import { serializeUser } from "../../user/helpers/serializeUser"
import { getOrganizationMemberList } from "../helpers/getOrganizationMemberList"
import { OrganizationData } from "../models/organizationModel"

export const sendOrganizationMemberList = () =>
  sendResourceList(
    async (options) => {
      const { context, limit, offset } = options
      const organization = context.state.resource as OrganizationData

      return getOrganizationMemberList({ offset, limit, organization: organization.id })
    },
    serializeUser(),
    {
      limit: 100,
      maxLimit: 100,
    },
  )
