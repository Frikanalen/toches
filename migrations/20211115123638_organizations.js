//@ts-check

/**
 * @param {import("knex").Knex} knex
 */
exports.up = async (knex) => {
  await knex.schema.createTable("organizations", (table) => {
    table.increments("id")
    table.integer("brreg_number").unique()

    table.string("name").notNullable().unique()
    table.text("description")
    table.string("homepage")

    table.string("postal_address", 128).notNullable()
    table.string("street_address", 128).notNullable()

    table.integer("editor_id").notNullable()
    table.foreign("editor_id").references("users.id").onDelete("RESTRICT")

    table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable()
    table.timestamp("updated_at").defaultTo(knex.fn.now()).notNullable()
  })
}

/**
 * @param {import("knex").Knex} knex
 */
exports.down = async (knex) => {
  await knex.schema.dropTable("organizations")
}
