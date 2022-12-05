import { db } from "../../db/db"
import {
  Organization,
  OrganizationEditor,
  QueryOrganizationArgs,
  Resolver,
} from "../../../generated/graphql"
import { OrganizationWithKeys, VideoWithKeys } from "../types"

export const getOrganization = async (
  organizationId: number | string,
): Promise<OrganizationWithKeys> => {
  console.log(organizationId)
  return db("organizations")
    .select("name", "description", "homepage", {
      id: db.raw("id::text"),
      idNumeric: "id",
      createdAt: "created_at",
      updatedAt: "updated_at",
      editorId: "editor_id",
      brregId: "brreg_number",
      postalAddress: "postal_address",
      streetAddress: "street_address",
    })
    .where("id", organizationId)
    .first()
}

export const resolveOrganizationQuery: Resolver<
  OrganizationWithKeys,
  any,
  any,
  QueryOrganizationArgs
> = async (parent, { id }) => getOrganization(id)

export const resolveOrganization: Resolver<
  OrganizationWithKeys,
  { organizationId: number }
> = async ({ organizationId }) => getOrganization(organizationId)

export const resolveOrganizationEditor: Resolver<
  OrganizationEditor,
  OrganizationWithKeys
> = async (parent) =>
  await db("users").select("id", "email", "name").where("id", parent.editorId).first()

export const resolveOrganizationLatestVideos: Resolver<
  Array<VideoWithKeys>,
  Pick<Organization, "id">
> = async (parent) =>
  await db("videos")
    .select("description", "title", {
      id: db.raw<string>("id::text"),
      createdAt: "created_at",
      updatedAt: "updated_at",
      viewCount: "view_count",
      mediaId: "media_id",
      organizationId: "organization_id",
    })
    .where("organization_id", parent.id)
    .orderBy("created_at", "desc")
    .limit(5)
