import { Model } from "../../db/classes/Model"
import { UserData, userModel } from "../../user/models/userModel"

export type OrganizationData = {
  id: number
  brregNumber?: number

  name: string
  description?: string
  homepage?: string

  editor: UserData

  postalAddress?: string
  streetAddress?: string

  createdAt: Date
  updatedAt: Date
}

export const organizationModel = new Model<OrganizationData>({
  tableName: "organizations",
  columns: [
    "id",
    "brreg_number",
    "name",
    "description",
    "homepage",
    "editor_id",
    "postal_address",
    "street_address",
    "created_at",
    "updated_at",
  ],
  structure: {
    prefix: "organization",
    property: "organization",
    children: [{ ...userModel.structure, property: "editor" }],
  },
})
