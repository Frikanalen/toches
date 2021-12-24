import { number, object } from "yup"
import { sendResourceList } from "../../core/middleware/sendResourceList"
import { createOrderingSchema } from "../../validation/helpers/createOrderingSchema"
import { getOrganizationList } from "../helpers/getOrganizationList"
import { serializeOrganization } from "../helpers/serializeOrganization"
import { organizationOrdering } from "../queries/organizationQuery"

export const sendOrganizationList = () =>
  sendResourceList(async (options) => {
    const { offset, limit, context } = options

    const query = await object({
      editor: number(),
    })
      .concat(createOrderingSchema(organizationOrdering))
      .validate(context.query)

    return getOrganizationList({ offset, limit, ...query })
  }, serializeOrganization)
