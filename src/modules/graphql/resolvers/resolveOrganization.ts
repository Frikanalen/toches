import { db } from "../../db/db"
import {
  Organization,
  QueryOrganizationArgs,
  Resolver,
  ResolversTypes,
} from "../../../generated/graphql"
import { DeepPartial } from "utility-types"
import { Organizations } from "../../../generated/tableTypes"
import { UserInputError } from "apollo-server-koa"

export const resolveOrganizationQuery: Resolver<
  DeepPartial<Organization>,
  any,
  any,
  QueryOrganizationArgs
> = async (parent, args) => {
  const org = await db<Organizations>("organizations")
    .select("id", "name", "description", "homepage")
    .select({
      createdAt: "created_at",
      updatedAt: "updated_at",
      orgId: "organization_id",
      brregId: "brreg_number",
      postalAddress: "postal_address",
      streetAddress: "street_address",
    })
    .where("id", args.id)
    .first()

  if (!org) throw new UserInputError(`Organization ${args.id} doesn't exist`)

  const filteredOrg: DeepPartial<Organization> = {
    ...org,
    id: org.id.toString(),
  }

  return filteredOrg
}

export const resolveOrganization: Resolver<
  DeepPartial<Organization>,
  { organizationId: string }
> = async (parent) =>
  await db("organizations")
    .select({ id: db.raw("id::text") }, "name")
    .where("id", parent.organizationId)
    .first()

export const resolveOrganizationEditor: Resolver<
  ResolversTypes["OrganizationEditor"],
  DeepPartial<Organization>
> = async (parent) => {
  const editor = await db("users")
    .select("id", "email")
    .select({ firstName: "first_name", lastName: "last_name" })
    .where("id", db("organizations").select("editor_id").where("id", parent.id))
    .first()

  return {
    ...editor,
    name: `${editor.firstName} ${editor.lastName}`,
  }
}

export const resolveOrganizationLatestVideos: Resolver<
  Array<ResolversTypes["Video"]>,
  DeepPartial<Organization>
> = async (parent) => {
  return await db("videos")
    .select("id")
    .select("description", "media_id", "title", {
      createdAt: "created_at",
      updatedAt: "updated_at",
      viewCount: "view_count",
    })
    .where("organization_id", parent.id)
    .orderBy("created_at")
    .limit(5)
}
