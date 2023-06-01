import { db } from "../../db/db"
import { makeOrganization, makeSession, makeUser, makeVideo } from "./testingToolkit"
import { requireVideoOwner } from "./requireVideoOwner"
import { Knex } from "knex"

let trx: Knex.Transaction

beforeEach(async () => {
  await db.migrate.latest()
  trx = await db.transaction()
})

afterEach(async () => {
  await trx.commit()
  await db.migrate.rollback()
})

it("Accepts the video's owner", async () => {
  const editor = await makeUser()
  const org = await makeOrganization(editor)
  const { session } = makeSession(editor)
  const videoId = await makeVideo(org, editor)

  expect(requireVideoOwner(session, videoId)).resolves.toBeUndefined()
})

it("Accepts admin user", async () => {
  const admin = await makeUser(true)
  const editor = await makeUser()
  const org = await makeOrganization(editor)
  const { session } = makeSession(admin)
  const videoId = await makeVideo(org, editor)

  expect(requireVideoOwner(session, videoId)).resolves.toBeUndefined()
})

it("Reject someone who isn't the video's owner", async () => {
  const user = await makeUser()
  const org = await makeOrganization(await makeUser())
  const { session } = makeSession(user)
  const videoId = await makeVideo(org, user)

  expect(requireVideoOwner(session, videoId)).rejects.toThrowError()
})
