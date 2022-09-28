import { db } from "../../db/db"
import {
  Organization,
  OrganizationEditor,
  QueryOrganizationArgs,
  Resolver,
} from "../../../generated/graphql"
import { Organizations } from "../../../generated/tableTypes"
import { UserInputError } from "apollo-server-koa"
import { OrganizationWithDescendants, VideoWithDescendants } from "../types"

export const resolveOrganizationQuery: Resolver<
  OrganizationWithDescendants,
  any,
  any,
  QueryOrganizationArgs
> = async (parent, args) => {
  const org = await db<Organizations>("organizations")
    .select("name", "description", "homepage", {
      id: db.raw("id::text"),
      createdAt: "created_at",
      updatedAt: "updated_at",
      editorId: "editor_id",
      brregId: "brreg_number",
      postalAddress: "postal_address",
      streetAddress: "street_address",
    })
    .where("id", args.id)
    .first()

  if (!org) throw new UserInputError(`Organization ${args.id} doesn't exist`)
  return org
}

export const resolveOrganization: Resolver<
  OrganizationWithDescendants,
  VideoWithDescendants
> = async (parent) =>
  await db("organizations")
    .select({ id: db.raw("id::text"), editorId: "editor_id" }, "name")
    .where("id", parent.organizationId)
    .first()

export const resolveOrganizationEditor: Resolver<
  OrganizationEditor,
  OrganizationWithDescendants
> = async (parent) =>
  await db("users")
    .select("id", "email")
    .select({
      firstName: "first_name",
      lastName: "last_name",
      name: db.raw("first_name || ' ' || last_name"),
    })
    .where("id", parent.editorId)
    .first()

export const resolveOrganizationLatestVideos: Resolver<
  Array<VideoWithDescendants>,
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
    .orderBy("created_at")
    .limit(5)
