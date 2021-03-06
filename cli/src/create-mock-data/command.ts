import { Command } from "commander"
import { organizationCommand } from "./organization"
import { userCommand } from "./user"
import { videoCommand } from "./video"

export const createMockDataCommand = new Command("create-mock-data").alias("cmd")

createMockDataCommand.addCommand(userCommand)
createMockDataCommand.addCommand(organizationCommand)
createMockDataCommand.addCommand(videoCommand)
