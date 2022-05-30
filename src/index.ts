import "dotenv/config.js"
import { app } from "./modules/core/app"
import { testDBConnection } from "./modules/db/db"
import { log } from "./modules/core/log"

if (typeof process.env.DATABASE_URL === "undefined") {
  throw new Error("DATABASE_URL is not set!")
}

const port = Number(process.env.PORT) || 8080

async function main() {
  log.info("Testing database connection...")
  await testDBConnection()

  app.listen(port, () => log.info(`App listening on port ${port}`))
  app.onerror = (err: any) => log.error(err)
}

main().catch((e) => log.error(e))
