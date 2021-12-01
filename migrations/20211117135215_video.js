//@ts-check

/**
 * @param {import("knex").Knex} knex
 */
exports.up = async (knex) => {
  await knex.schema.createTable("video_media", (table) => {
    table.increments("id")

    table.string("file_name").notNullable()
    table.string("orginal_path").notNullable()

    table.float("duration").notNullable()
    table.json("metadata").notNullable()
  })

  await knex.schema.createTable("video_media_assets", (table) => {
    table.increments("id")

    table.string("locator").notNullable()
    table.string("type").notNullable()
    table.json("metadata")

    table.integer("media_id").notNullable()
    table.foreign("media_id").references("video_media.id").onDelete("CASCADE")
  })

  await knex.schema.createTable("videos", (table) => {
    table.increments("id")

    table.string("title").notNullable()
    table.text("description")

    table.integer("uploader_id")
    table.foreign("uploader_id").references("users.id").onDelete("SET NULL")

    table.integer("organization_id").notNullable()
    table.foreign("organization_id").references("organizations.id").onDelete("CASCADE")

    table.integer("media_id").unique().notNullable()
    table.foreign("media_id").references("video_media.id").onDelete("CASCADE")

    table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable()
    table.timestamp("updated_at").defaultTo(knex.fn.now()).notNullable()

    table.integer("view_count").defaultTo(0).notNullable()
  })
}

/**
 * @param {import("knex").Knex} knex
 */
exports.down = async (knex) => {
  await knex.schema.dropTable("videos")
  await knex.schema.dropTable("video_media_assets")
  await knex.schema.dropTable("video_media")
}
