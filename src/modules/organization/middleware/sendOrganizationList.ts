import { sendResourceList } from "../../core/middleware/sendResourceList"
import { getOrganizationList } from "../helpers/getOrganizationList"
import { serializeOrganization } from "../helpers/serializeOrganization"

export const sendOrganizationList = () =>
  sendResourceList(async (options) => {
    const { offset, limit } = options
    return getOrganizationList({ offset, limit })
  }, serializeOrganization)
