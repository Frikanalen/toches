import {
  MutationOrganizationArgs,
  OrganizationInput,
  Resolver,
} from "../../../generated/graphql"
import { OrganizationWithKeys } from "../types"
import { db } from "../../db/db"
import { Organizations } from "../../../generated/tableTypes"
import { getOrganization } from "./resolveOrganization"
import { requireUser } from "../utils/requireUser"
import { requireOrganizationEditor } from "../utils/requireOrganizationEditor"
import { requireAdmin } from "../utils/requireAdmin"

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
  db<Organizations>("organizations")
    .insert({
      name: name || undefined,
      postal_address: postalAddress || undefined,
      street_address: streetAddress || undefined,
      brreg_number: brregId ? parseInt(brregId) : undefined,
      editor_id: editorId,
    })
    .returning("id")

export const mutateOrganization: Resolver<
  OrganizationWithKeys,
  any,
  any,
  MutationOrganizationArgs
> = async (parent, { organization }, context) => {
  if (!organization.id) {
    const userId = await requireUser(context)

    const [{ id }] = await createOrganization({
      ...organization,
      editorId: userId,
    })

    return getOrganization(id)
  }

  try {
    await requireAdmin(context.session)
  } catch {
    await requireOrganizationEditor(context.session, organization.id)
  }

  const [{ id }] = await updateOrganization(organization)
  return getOrganization(id)
}
