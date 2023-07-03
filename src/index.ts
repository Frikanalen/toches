import * as dotenv from "dotenv"
dotenv.config({ path: __dirname + '/../.env' });

import { app } from "./modules/core/app"
import { testDBConnection } from "./modules/db/db"
import { log } from "./modules/core/log"

const port = Number(process.env.PORT) || 8080

async function main() {
  log.info("Testing database connection...")
  await testDBConnection()

  app.listen(port, () => log.info(`App listening on port ${port}`))
  app.onerror = (err: any) => log.error(err)
}

main().catch((e) => log.error(e))
