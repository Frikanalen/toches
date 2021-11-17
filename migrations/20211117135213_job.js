//@ts-check

/**
 * @param {import("knex").Knex} knex
 */
exports.up = async (knex) => {
  await knex.schema.createTable("jobs", (table) => {
    table.increments("id")

    table.string("description")
    table.float("progress").notNullable().defaultTo(0)

    table
      .enum("status", ["pending", "active", "done", "failed"], {
        useNative: true,
        enumName: "job_status",
      })
      .defaultTo("pending")
      .notNullable()
  })
}

/**
 * @param {import("knex").Knex} knex
 */
exports.down = async (knex) => {
  await knex.schema.dropTable("jobs")
}
