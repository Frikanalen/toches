import { db } from "../../db/db"
import { getOrganization } from "../../organization/helpers/getOrganization"
import { Organization, Resolver, Video } from "../../../generated/graphql"

export const resolveOrganizationQuery: Resolver<Organization, Video> = async (parent) => {
  const { organization_id } = await db<number>("videos")
    .select("organization_id")
    .where("id", parent.id)
    .first()

  const { id, name } = await getOrganization(organization_id)

  return {
    id: id.toString(),
    name,
  }
}
