import { requireOrganizationEditor } from "./requireOrganizationEditor"
import { db } from "../../db/db"
import { makeOrganization, makeSession, makeUser } from "./testingToolkit"

beforeEach(async () => {
  await db.migrate.latest()
})

afterEach(async () => {
  await db.migrate.rollback()
})

it("Rejects a fresh session", async () => {
  const organizationId = await makeOrganization(await makeUser())
  const { session } = makeSession()

  expect(requireOrganizationEditor(session, organizationId)).rejects.toThrowError()
})

it("Rejects a non-editor", async () => {
  const notEditor = await makeUser()
  const isEditor = await makeUser()
  const organizationId = await makeOrganization(isEditor)
  const { session } = makeSession(notEditor)

  expect(requireOrganizationEditor(session, organizationId)).rejects.toThrowError()
})

it("Permits admin irrespective of editor", async () => {
  const isEditor = await makeUser()
  const notEditorButAdmin = await makeUser(true)
  const organizationId = await makeOrganization(isEditor)
  const { session } = makeSession(notEditorButAdmin)

  expect(requireOrganizationEditor(session, organizationId)).resolves.toBeUndefined()
})

it("Permits the editor", async () => {
  const isEditor = await makeUser()
  const organizationId = await makeOrganization(isEditor)
  const { session } = makeSession(isEditor)

  expect(requireOrganizationEditor(session, organizationId)).resolves.toBeUndefined()
})
