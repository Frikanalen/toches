//@ts-check

/**
 * @param {import("knex").Knex} knex
 */
exports.up = async (knex) => {
  await knex.schema.createTable("organization_members", (table) => {
    table.increments("id")

    table.integer("user_id").notNullable()
    table.foreign("user_id").references("users.id").onDelete("CASCADE")

    table.integer("organization_id").notNullable()
    table.foreign("organization_id").references("organizations.id").onDelete("CASCADE")

    table.unique(["user_id", "organization_id"])
  })
}

/**
 * @param {import("knex").Knex} knex
 */
exports.down = async (knex) => {
  await knex.schema.dropTable("organization_members")
}
