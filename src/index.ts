import "dotenv/config"
import { app } from "./modules/core/app"
import { testDBConnection } from "./modules/db/db"

if (typeof process.env.DATABASE_URL === "undefined") {
  throw new Error("DATABASE_URL is undefined!")
}

const port = Number(process.env.PORT) || 8000

async function main() {
  console.info("Testing database connection...")
  await testDBConnection()

  app.listen(port, () => console.info(`App listening on port ${port}`))
}

main().catch(console.error)
