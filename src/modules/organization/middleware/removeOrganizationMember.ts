import { Middleware } from "koa"
import { HttpError } from "../../core/classes/HttpError"
import { db } from "../../db/db"
import { OrganizationData } from "../models/organizationModel"

export const removeOrganizationMember = (): Middleware => async (context, next) => {
  const { state, params } = context

  const organization = state.resource as OrganizationData
  const user = Number(params.member)

  if (isNaN(user)) {
    throw new HttpError(400, "User id must be a number")
  }

  await db
    .delete()
    .from("organization_members")
    .where("organization_id", organization.id)
    .andWhere("user_id", user)

  context.body = { message: "Successfully removed member" }
  return next()
}
