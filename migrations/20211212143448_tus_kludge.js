//@ts-check

/**
 * @param {import("knex").Knex} knex
 */
exports.up = async (knex) => {
  await knex.schema.createTable("tus_media_map", (table) => {
    table.integer("video_media_id").notNullable()
    table.string("tus_upload_id").notNullable().unique()

    table.foreign("video_media_id").references("video_media.id").onDelete("CASCADE")
  })
}

/**
 * @param {import("knex").Knex} knex
 */
exports.down = async (knex) => {
  await knex.schema.dropTable("tus_media_map")
}
