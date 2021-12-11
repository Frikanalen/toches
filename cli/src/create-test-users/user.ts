import { Command } from "commander"
import faker from "faker"
import { db } from "../db"
import bcrypt from "bcrypt"

export const createAdminCommand = new Command("admin")
  .description("Add admin user to the database")
  .action(async () => {
    const password = await bcrypt.hash("dev-admin", 12)
    const user = {
        email: "dev-admin@frikanalen.no",
        password: `bcrypt${password}`,
        first_name: "Frikanalen admin",
        last_name: "Istrator",
      }

    const [ id ] = await db.insert(user).into("users").returning("id")
    await db.insert({role_id: 1, user_id: id}).into("role_user_map")

    console.info("Generated user. It looks like this:")
    console.info(user)
  })
