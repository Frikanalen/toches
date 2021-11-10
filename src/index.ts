import "dotenv/config"
import { testDBConnection } from "./modules/db/db"

if (typeof process.env.DATABASE_URL === "undefined") {
  throw new Error("DATABASE_URL is undefined!")
}

async function main() {
  console.info("Testing database connection...")
  await testDBConnection()
}

main().catch(console.error)
