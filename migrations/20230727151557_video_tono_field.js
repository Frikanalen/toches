//@ts-check

// Add a tonoEncumbered field to videos to indicate copyright encumberance

/**
 * @param {import("knex").Knex} knex
 */
exports.up = async (knex) => {
  await knex.schema.table("videos", (table) => {
    table.boolean("tono_encumbered").notNullable().defaultTo(false)
  })
}

/**
 * @param {import("knex").Knex} knex
 */
exports.down = async (knex) => {
  await knex.schema.table("videos", (table) => {
    table.dropColumn("tono_encumbered")
  })
}
