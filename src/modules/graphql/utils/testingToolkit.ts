import { TochesContext } from "../types"
import { createOrganization } from "../../organization/helpers/createOrganization"
import { createUser } from "../../user/helpers/createUser"
import { db } from "../../db/db"
import { faker } from "@faker-js/faker"
import { createMockContext } from "@shopify/jest-koa-mocks"
import { createVideo } from "../../video/helpers/createVideo"
import { DatabaseKey } from "./requireOrganizationEditor"
import { createVideoMedia } from "../../video/helpers/createVideoMedia"

export const makeUser = async (isAdmin: boolean = false) => {
  const { id } = await createUser({
    email: faker.internet.email(),
    password: faker.internet.password(),
    name: faker.person.fullName(),
  })

  if (isAdmin) await db.insert({ role_id: 1, user_id: id }).into("role_user_map")

  return id
}
export const makeOrganization = async (editorId: number) => {
  const { id } = await createOrganization(
    {
      brregNumber: parseInt(faker.string.numeric(9)),
      name: faker.company.name(),
      homepage: faker.internet.url(),
      postalAddress: faker.location.streetAddress(),
      streetAddress: faker.location.streetAddress(),
    },
    editorId,
  )

  return id
}

export const makeVideo = async (organizationId: DatabaseKey, editorId: DatabaseKey) => {
  const mediaId = await createVideoMedia({
    fileName: "foo",
    locator: "bar",
    duration: 10,
    metadata: {},
  })

  const { id } = await createVideo(
    {
      title: faker.lorem.sentence(),
      mediaId,
      description: faker.lorem.paragraph(),
      jukeboxable: true,
      categories: [],
    },
    organizationId,
    editorId,
  )

  return id
}

export const makeSession = (userId?: number) =>
  createMockContext(userId ? { session: { user: userId } } : undefined) as TochesContext
