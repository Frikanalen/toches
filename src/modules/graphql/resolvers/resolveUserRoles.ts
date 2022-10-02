import { Resolver } from "../../../generated/graphql"
import { db } from "../../db/db"
import { UserRoleWithKeys, UserWithKeys } from "../types"

export const resolveUserRoles: Resolver<Array<UserRoleWithKeys>, UserWithKeys> = async ({
  id,
}) =>
  db("organizations")
    .select({ role: db.raw("'EDITOR'"), organizationId: "id" })
    .where("editor_id", id)
