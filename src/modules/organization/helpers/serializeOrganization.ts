import { serializeUser } from "../../user/helpers/serializeUser"
import { OrganizationData } from "../models/organizationModel"

export const serializeOrganization = (organization: OrganizationData) => {
  const { id, name, description, homepage, postalAddress, streetAddress, editor } =
    organization

  return {
    id,
    name,
    description,
    homepage,
    postalAddress,
    streetAddress,
    editor: serializeUser()(editor),
  }
}
