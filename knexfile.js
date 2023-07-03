require('dotenv').config({ path: __dirname+'/.env' });

const getConnstring = () => {
  const {DATABASE_URL} = process.env

  if (process.env.NODE_ENV === "production") {
    if (!DATABASE_URL?.length) {
      throw new Error("DATABASE_URL is not set!")
    }

    return process.env.DATABASE_URL
  } else {
    const {POSTGRES_1_0_POSTGRES_SERVICE_HOST, POSTGRES_1_0_POSTGRES_SERVICE_PORT, DB_PASS, DB_USER} = process.env

    if (POSTGRES_1_0_POSTGRES_SERVICE_HOST && POSTGRES_1_0_POSTGRES_SERVICE_PORT) { 
      return `postgres://${DB_USER}:${DB_PASS}@${POSTGRES_1_0_POSTGRES_SERVICE_HOST}:${POSTGRES_1_0_POSTGRES_SERVICE_PORT}/fk`
    }

    if(!DATABASE_URL?.length) {
      throw new Error("DATABASE_URL is not set!")
    }

    return DATABASE_URL
  }
}

module.exports = {
  test: {
    client: "pg",
    connection: process.env.DATABASE_TEST_URL,
    migrations: {
      stub: "migration.stub.js",
    },
  },
  client: "pg",
  connection: getConnstring(),
  migrations: {
    stub: "migration.stub.js",
  },
  postgres: {
    client: "pg",
    connection: getConnstring(),
    migrations: {
      stub: "migration.stub.js",
    },
  }
}
