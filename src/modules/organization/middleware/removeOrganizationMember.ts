import { Middleware } from "koa"
import { number, object } from "yup"
import { db } from "../../db/db"
import { OrganizationData } from "../models/organizationModel"

export const removeOrganizationMember = (): Middleware => async (context, next) => {
  const { state, params } = context

  const organization = state.resource as OrganizationData
  const { member: user } = await object({
    member: number().required(),
  }).validate(params)

  await db
    .delete()
    .from("organization_members")
    .where("organization_id", organization.id)
    .andWhere("user_id", user)

  context.body = { message: "Successfully removed member" }
  return next()
}
