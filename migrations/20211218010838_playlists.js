//@ts-check

/**
 * @param {import("knex").Knex} knex
 */
exports.up = async (knex) => {
  await knex.schema.createTable("playlists", (table) => {
    table.increments("id")

    table.string("title").notNullable()
    table.text("description")

    table.integer("organization_id").notNullable()
    table.foreign("organization_id").references("organizations.id").onDelete("CASCADE")
  })

  await knex.schema.createTable("playlist_entries", (table) => {
    table.increments("id")

    table.integer("index").notNullable()

    table.integer("playlist_id").notNullable()
    table.foreign("playlist_id").references("playlists.id").onDelete("CASCADE")

    table.integer("video_id").notNullable()
    table.foreign("video_id").references("videos.id").onDelete("CASCADE")

    table.unique(["index", "playlist_id"])
    table.unique(["video_id", "playlist_id"])
  })
}

/**
 * @param {import("knex").Knex} knex
 */
exports.down = async (knex) => {
  await knex.schema.dropTable("playlist_entries")
  await knex.schema.dropTable("playlists")
}
