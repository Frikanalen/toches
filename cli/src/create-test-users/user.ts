import { Command } from "commander"
import faker from "faker"
import { db } from "../db"

export const createAdminCommand = new Command("admin")
  .description("Add admin user to the database")
  .action(async () => {
    const user = {
        email: "dev-admin@frikanalen.no",
        password: "dev-admin",
        first_name: "Frikanalen admin",
        last_name: "Istrator",
      }

    await db.insert(user).into("users")

    console.info("Generated user. It looks like this:")
    console.info(user)
  })
