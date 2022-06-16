import { Middleware } from "koa"
import { object, string } from "yup"
import { db } from "../../db/db"
import { UserData, userModel } from "../../user/models/userModel"
import { OrganizationData } from "../models/organizationModel"

export const addOrganizationMember = (): Middleware => async (context, next) => {
  const { state, request } = context
  const organization = state.resource as OrganizationData

  const payload = await object({ email: string().required().email() }).validate(
    request.body,
  )
  const user = await db
    .select("email", "id")
    .where("email", payload.email)
    .from(userModel.tableName)
    .first<UserData>()

  if (!user) context.throw(404, "No user with that email exists", "email_invalid")

  await db
    .insert({ user_id: user.id, organization_id: organization.id })
    .into("organization_members")

  context.body = { message: "Successfully added member" }
  return next()
}
