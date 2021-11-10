//@ts-check

/**
 * @param {import("knex").Knex} knex
 */
exports.up = async (knex) => {
  await knex.schema.createTable("sessions", (table) => {
    table.increments("id")
    table.string("key").notNullable()
    table.integer("maxAge").notNullable()
    table.json("session").notNullable()
  })
}

/**
 * @param {import("knex").Knex} knex
 */
exports.down = async (knex) => {
  await knex.schema.dropTable("sessions")
}
