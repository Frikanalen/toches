#!/usr/bin/env node

import { program } from "commander"
import { createMockDataCommand } from "./create-mock-data/command"
import { createTestUsersCommand } from "./create-test-users/command"
import { migrateFkwebCommand } from "./migrate-fkweb/command"

program.addCommand(createMockDataCommand)
program.addCommand(createTestUsersCommand)
program.addCommand(migrateFkwebCommand)

program.hook("postAction", () => process.exit(0))
program.parse(process.argv)
