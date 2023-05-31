require("dotenv/config")

module.exports = {
  test: {
    client: "pg",
    connection: process.env.DATABASE_TEST_URL,
    migrations: {
      stub: "migration.stub.js",
    },
  },
  postgres: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    migrations: {
      stub: "migration.stub.js",
    },
  }
}
