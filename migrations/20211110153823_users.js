//@ts-check

/**
 * @param {import("knex").Knex} knex
 */
exports.up = async (knex) => {
  await knex.schema.createTable("users", (table) => {
    table.increments("id")

    table.string("email").unique().notNullable()
    table.string("password").notNullable()

    table.string("first_name").notNullable()
    table.string("last_name").notNullable()

    table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable()
    table.timestamp("updated_at").defaultTo(knex.fn.now()).notNullable()
    table.timestamp("last_logged_in_at")

    table.boolean("banned").defaultTo("false").notNullable()
  })
}

/**
 * @param {import("knex").Knex} knex
 */
exports.down = async (knex) => {
  await knex.schema.dropTable("users")
}
