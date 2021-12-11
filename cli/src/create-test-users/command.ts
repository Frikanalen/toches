import { Command } from "commander"
import { createAdminCommand } from "./user"

export const createTestUsersCommand = new Command("create-test-users").alias("ctu")

createTestUsersCommand.addCommand(createAdminCommand)
