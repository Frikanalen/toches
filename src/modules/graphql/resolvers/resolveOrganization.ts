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
    .fromRaw("videos as v, video_media as vm")
    .select({
      title: "v.title",
      description: db.raw("COALESCE(v.description, '')"),
      id: db.raw("v.id::text"),
      createdAt: "v.created_at",
      updatedAt: "v.updated_at",
      viewCount: "v.view_count",
      organizationId: "v.organization_id",
      mediaId: "v.media_id",
      duration: "vm.duration",
    })
    .where("v.organization_id", parent.id)
    .andWhereRaw("vm.id = v.media_id")
    .orderBy("v.created_at", "desc")
    .limit(5)
