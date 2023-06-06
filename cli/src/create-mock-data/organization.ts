import { faker } from "@faker-js/faker"
import { Command } from "commander"
import { db } from "../db"
import { getRandomItem } from "../helpers/getRandomItem"

const address = () =>
  faker.helpers.fake(
    "{{address.streetAddress}}\n{{address.zipCode}} {{address.state}}, {{address.country}}",
  )

export const organizationCommand = new Command("organizations")
  .description("Add randomly generated organizations to the database")
  .alias("orgs")
  .option("-e, --editor", "Specify editor (user)", (x) => parseInt(x) || 1)
  .argument(
    "[amount]",
    "The amount of organizations to generate, defaults to one",
    (x) => parseInt(x) || 1,
    1,
  )
  .action(async (amount) => {
    const { editor } = organizationCommand.opts()
    const ids = await db.select("id").from("users").pluck<number[]>("id")

    const organizations = Array(amount)
      .fill(undefined)
      .map(() => ({
        name: faker.company.name(),
        description: faker.commerce.productDescription(),
        homepage: faker.internet.url(),
        postal_address: address(),
        street_address: address(),
        editor_id: editor ?? getRandomItem(ids),
      }))

    await db.batchInsert("organizations", organizations)

    console.info(`Generated ${amount} organization(s). One of them looks like this:`)
    console.info(organizations[0])
  })
