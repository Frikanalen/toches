import { serializeUser } from "../../user/helpers/serializeUser"
import { OrganizationData } from "../models/organizationModel"

/**
 * @openapi
 * components:
 *  schemas:
 *    Organization:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *        name:
 *          type: string
 *        description:
 *          type: string
 *        homepage:
 *          type: string
 *          format: url
 *        postalAddress:
 *          type: string
 *        streetAddress:
 *          type: string
 *        editor:
 *          $ref: '#/components/schemas/User'
 */
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
