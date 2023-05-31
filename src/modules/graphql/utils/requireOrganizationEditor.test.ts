import { requireOrganizationEditor } from "./requireOrganizationEditor"
import { db } from "../../db/db"
import { createUser } from "../../user/helpers/createUser"
import { createOrganization } from "../../organization/helpers/createOrganization"
import { faker } from "@faker-js/faker"
import { createMockContext } from "@shopify/jest-koa-mocks"
import { TochesContext } from "../types"

beforeEach(async () => {
  await db.migrate.latest()
})

afterEach(async () => {
  await db.migrate.rollback()
})

const makeUser = async (isAdmin: boolean = false) => {
  const { id } = await createUser({
    email: faker.internet.email(),
    password: faker.internet.password(),
    name: faker.person.fullName(),
  })

  if (isAdmin) await db.insert({ role_id: 1, user_id: id }).into("role_user_map")

  return id
}

const makeOrganization = async (editor_id: number) => {
  const { id } = await createOrganization(
    {
      brregNumber: parseInt(faker.string.numeric(9)),
      name: faker.company.name(),
      homepage: faker.internet.url(),
      postalAddress: faker.location.streetAddress(),
      streetAddress: faker.location.streetAddress(),
    },
    editor_id,
  )

  return id
}

const loginContext = (user_id: number) =>
  createMockContext({ session: { user: user_id } }) as TochesContext

const blankContext = () => createMockContext() as TochesContext

it("Rejects an unauthorized user", async () => {
  const organizationId = await makeOrganization(await makeUser())
  const { session } = blankContext()

  expect(requireOrganizationEditor(session, organizationId)).rejects.toThrowError()
})

it("Rejects a non-editor", async () => {
  const notEditor = await makeUser()
  const isEditor = await makeUser()
  const organizationId = await makeOrganization(isEditor)
  const { session } = loginContext(notEditor)

  expect(requireOrganizationEditor(session, organizationId)).rejects.toThrowError()
})

it("Permits admin irrespective of editor", async () => {
  const isEditor = await makeUser()
  const notEditorButAdmin = await makeUser(true)
  const organizationId = await makeOrganization(isEditor)
  const { session } = loginContext(notEditorButAdmin)

  expect(requireOrganizationEditor(session, organizationId)).resolves.toBeUndefined()
})

it("Permits the editor", async () => {
  const isEditor = await makeUser()
  const organizationId = await makeOrganization(isEditor)
  const { session } = loginContext(isEditor)

  expect(requireOrganizationEditor(session, organizationId)).resolves.toBeUndefined()
})
