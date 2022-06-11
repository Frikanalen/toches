//@ts-check

/**
 * @param {import("knex").Knex} knex
 */
exports.up = async (knex) => {
  await knex.schema.createTable("bulletins", (table) => {
    table.increments("id")

    table.string("title").notNullable()
    table.text("text")

    table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable()
    table.timestamp("updated_at").defaultTo(knex.fn.now()).notNullable()
  })
}

/**
 * @param {import("knex").Knex} knex
 */
exports.down = async (knex) => {
  await knex.schema.dropTable("bulletins")
}
