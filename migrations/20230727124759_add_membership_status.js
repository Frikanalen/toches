//@ts-check

/**
 * @param {import("knex").Knex} knex
 */
exports.up = async (knex) => {
  // Alter the "organizations" table to add an "active" column
  await knex.schema.alterTable("organizations", (table) => {
    table.boolean("active").defaultTo(false)
  })
}

/**
 * @param {import("knex").Knex} knex
 */
exports.down = async (knex) => {
  // Remove the "active" column
  await knex.schema.alterTable("organizations", (table) => {
    table.dropColumn("active")
  })
}
