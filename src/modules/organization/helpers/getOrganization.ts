import { organizationModel } from "../models/organizationModel"
import { organizationQuery } from "../queries/organizationQuery"

export const getOrganization = async (id: number) => {
  const [query] = await organizationQuery.prepare({ single: true })

  query.from(organizationModel.tableName).where("organizations.id", id).first()

  const [organization] = await organizationModel.parseFromQuery(query)
  return organization
}
