import { makeSession, makeUser } from "./testingToolkit"
import { requireUser } from "./requireUser"
import { db } from "../../db/db"

beforeEach(async () => {
  await db.migrate.latest()
})

afterEach(async () => {
  await db.migrate.rollback()
})

it("Accepts a user", async () => {
  const userId = await makeUser()
  expect(requireUser(makeSession(userId).session)).resolves.toEqual(userId)
})

it("Rejects blank session", async () => {
  expect(requireUser(makeSession().session)).rejects.toThrowError()
})
