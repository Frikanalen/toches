#!/usr/bin/env node

import { program } from "commander"
import { createMockDataCommand } from "./create-mock-data/command"
import { createTestUsersCommand } from "./create-test-users/command"

program.addCommand(createMockDataCommand)
program.addCommand(createTestUsersCommand)

program.hook("postAction", () => process.exit(0))
program.parse(process.argv)
