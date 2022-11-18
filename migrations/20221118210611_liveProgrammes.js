//@ts-check

/**
 * @param {import("knex").Knex} knex
 */
exports.up = async (knex) => {
  await knex.schema.createTable("live_programmes", (table) => {
    table.increments("id")

    table.string("title").notNullable()
    table.text("description")

    table.integer("organization_id").notNullable()
    table.foreign("organization_id").references("organizations.id").onDelete("CASCADE")

    table.timestamp("starts_at").notNullable()
    table.float("duration").notNullable()

    table.timestamps()
  })
}

/**
 * @param {import("knex").Knex} knex
 */
exports.down = async (knex) => {
  await knex.schema.dropTable("live_programmes")

}
