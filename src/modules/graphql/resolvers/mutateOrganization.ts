import {
  MutationOrganizationArgs,
  OrganizationInput,
  Resolver,
} from "../../../generated/graphql"
import { OrganizationWithKeys } from "../types"
import { requireAdmin } from "../utils/requireAdmin"
import { db } from "../../db/db"
import { Organizations } from "../../../generated/tableTypes"
import { getOrganization } from "./resolveOrganization"

const updateOrganization = async ({
  id,
  name,
  postalAddress,
  streetAddress,
  brregId,
}: OrganizationInput) =>
  await db<Organizations>("organizations")
    .where("id", id)
    .update({
      name: name || undefined,
      postal_address: postalAddress || undefined,
      street_address: streetAddress || undefined,
      brreg_number: brregId ? parseInt(brregId) : undefined,
    })
    .returning("id")

const createOrganization = async ({
  name,
  postalAddress,
  streetAddress,
  brregId,
  editorId,
}: OrganizationInput & { editorId: number }) =>
  (
    await db<Organizations>("organizations")
      .insert({
        name: name || undefined,
        postal_address: postalAddress || undefined,
        street_address: streetAddress || undefined,
        brreg_number: brregId ? parseInt(brregId) : undefined,
        editor_id: editorId,
      })
      .returning("id")
  )[0].id

export const mutateOrganization: Resolver<
  OrganizationWithKeys,
  any,
  any,
  MutationOrganizationArgs
> = async (parent, { organization }, context) => {
  await requireAdmin(context.session)

  const id = organization.id
    ? await updateOrganization(organization)
    : await createOrganization({
        ...organization,
        editorId: context.session.user,
      })

  return getOrganization(id as unknown as number)
}
