//@ts-check

/**
 * @param {import("knex").Knex} knex
 */
exports.up = async (knex) => {
  await knex.schema.createTable("jukebox_entries", (table) => {
    table.increments("id")

    table.integer("video_id").notNullable()
    table.foreign("video_id").references("videos.id").onDelete("CASCADE")

    table.timestamp("starts_at").notNullable()
  })
}

/**
 * @param {import("knex").Knex} knex
 */
exports.down = async (knex) => {
  await knex.schema.dropTable("jukebox_entries")
}
