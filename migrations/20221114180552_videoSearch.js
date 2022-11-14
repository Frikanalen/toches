//@ts-check

/**
 * @param {import("knex").Knex} knex
 */
exports.up = async (knex) => {
    await knex.raw("create index idx_videos_search on videos using gin(to_tsvector('norwegian', title || ' ' || description))")
}

/**
 * @param {import("knex").Knex} knex
 */
exports.down = async (knex) => {
  await knex.raw("drop index idx_videos_search")
}
