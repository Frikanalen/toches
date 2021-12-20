//@ts-check

/**
 * @param {import("knex").Knex} knex
 */
exports.up = async (knex) => {
  await knex.schema.alterTable("videos", (table) => {
    table.boolean("jukeboxable").notNullable().defaultTo(false)
  })
}

/**
 * @param {import("knex").Knex} knex
 */
exports.down = async (knex) => {
  await knex.schema.alterTable("videos", (table) => {
    table.dropColumn("jukeboxable")
  })
}
