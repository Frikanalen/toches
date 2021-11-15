import { db } from "../../db/db"
import { organizationModel } from "../models/organizationModel"
import { ValidatedOrganization } from "../schemas/organizationSchema"
import { getOrganization } from "./getOrganization"

export const createOrganization = async (data: ValidatedOrganization, editor: number) => {
  const { brregNumber, name, homepage, postalAddress, streetAddress } = data

  const [id] = await db
    .insert({
      brreg_number: brregNumber,
      name,
      homepage,
      postal_address: postalAddress,
      street_address: streetAddress,
      editor_id: editor,
    })
    .into(organizationModel.tableName)
    .returning<number[]>("id")

  return getOrganization(id)
}
