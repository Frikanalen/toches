import { program } from "commander"
import { createMockDataCommand } from "./create-mock-data/command"
import { testDBConnection } from "./db"

program.addCommand(createMockDataCommand)

program.hook("preAction", async () => {
  console.info(`Testing DB connection...`)
  await testDBConnection()
})

program.hook("postAction", () => process.exit(0))
program.parse(process.argv)
