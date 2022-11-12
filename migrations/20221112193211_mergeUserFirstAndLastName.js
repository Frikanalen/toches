//@ts-check

// Caution: Not idempotent.

/**
 * @param {import("knex").Knex} knex
 */
exports.up = async (knex) => {
  await knex.transaction(async (trx) => {
    await trx.schema.alterTable("users", (table) => {
      table.string("name")
    })

    await trx("users").update({ name: knex.raw("(first_name || ' ' || last_name)") })

    await trx.schema.alterTable("users", (table) => {
      table.dropColumn("first_name")
      table.dropColumn("last_name")
    })
  })
}

/**
 * @param {import("knex").Knex} knex
 */
exports.down = async (knex) => {
  await knex.transaction(async (trx) => {
    await trx.schema.alterTable("users", (table) => {

      table.string("first_name").notNullable().defaultTo("")
      table.string("last_name").notNullable().defaultTo("")
    })

    await trx("users").update({ first_name: knex.raw("(name)") })

    await trx.schema.alterTable("users", (table) => {
      table.dropColumn("name")
    })
  })
}
