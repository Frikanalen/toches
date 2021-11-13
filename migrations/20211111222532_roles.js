//@ts-check

/**
 * @param {import("knex").Knex} knex
 */
exports.up = async (knex) => {
  await knex.schema.createTable("roles", (table) => {
    table.increments("id")
    table.string("name").unique().notNullable()
  })

  await knex.schema.createTable("role_user_map", (table) => {
    table.increments("id")

    table.integer("role_id").notNullable()
    table.integer("user_id").notNullable()

    table.foreign("role_id").references("roles.id").onDelete("CASCADE")
    table.foreign("user_id").references("users.id").onDelete("CASCADE")

    table.unique(["role_id", "user_id"])
  })

  // Root role
  await knex.insert({ name: "root" }).into("roles")
}

/**
 * @param {import("knex").Knex} knex
 */
exports.down = async (knex) => {
  await knex.schema.dropTable("role_user_map")
  await knex.schema.dropTable("roles")
}
