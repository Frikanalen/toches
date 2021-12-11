import { number, object } from "yup"
import { sendResourceList } from "../../core/middleware/sendResourceList"
import { getOrganizationList } from "../helpers/getOrganizationList"
import { serializeOrganization } from "../helpers/serializeOrganization"

export const sendOrganizationList = () =>
  sendResourceList(async (options) => {
    const { offset, limit, context } = options

    const query = await object({
      editor: number(),
    }).validate(context.query)

    return getOrganizationList({ offset, limit, ...query })
  }, serializeOrganization)
