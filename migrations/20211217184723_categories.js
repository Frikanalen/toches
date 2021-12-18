//@ts-check

const starterCategories = [
  {
    key: "society",
    name: "Samfunn og politikk",
    description: "",
  },
  {
    key: "solidarity",
    name: "Solidaritet og bistand",
    description: "",
  },
  {
    key: "religion",
    name: "Religion og livssyn",
    description: "",
  },
  {
    key: "minorities",
    name: "Minoriteter",
    description: "",
  },
  {
    key: "welfare",
    name: "Velferd",
    description: "",
  },
  {
    key: "culture",
    name: "Kultur",
    description: "",
  },
  {
    key: "sports",
    name: "Idrett",
    description: "",
  },
  {
    key: "public-security",
    name: "Beredskap",
    description: "",
  },
  {
    key: "children",
    name: "Barn og ungdom",
    description: "",
  },
  {
    key: "technology",
    name: "Teknologi",
    description: "",
  },
  {
    key: "other",
    name: "Annet",
    description: "",
  },
]

/**
 * @param {import("knex").Knex} knex
 */
exports.up = async (knex) => {
  await knex.schema.createTable("categories", (table) => {
    table.increments("id")

    table.string("key").notNullable().unique()
    table.string("name").notNullable().unique()
    table.text("description").notNullable()
  })

  await knex.schema.createTable("video_category_map", (table) => {
    table.increments("id")

    table.integer("category_id").notNullable()
    table.foreign("category_id").references("categories.id").onDelete("CASCADE")

    table.integer("video_id").notNullable()
    table.foreign("video_id").references("videos.id").onDelete("CASCADE")

    table.unique(["category_id", "video_id"])
  })

  await knex.batchInsert("categories", starterCategories)
}

/**
 * @param {import("knex").Knex} knex
 */
exports.down = async (knex) => {
  await knex.schema.dropTable("video_category_map")
  await knex.schema.dropTable("categories")
}
