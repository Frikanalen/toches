import { Command } from "commander"
import { faker } from "@faker-js/faker"
import { db } from "../db"

export const userCommand = new Command("users")
  .description("Add randomly generated users to the database")
  .argument(
    "[amount]",
    "The amount of users to generate, defaults to one",
    (x) => parseInt(x) || 1,
    1,
  )
  .action(async (amount: number) => {
    const users = Array(amount)
      .fill(undefined)
      .map(() => ({
        email: faker.internet.email(),
        password: "TEST_USER_PASSWORD",
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
      }))

    await db.batchInsert("users", users)

    console.info(`Generated ${amount} user(s). One of them looks like this:`)
    console.info(users[0])
  })
