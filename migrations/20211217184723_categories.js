//@ts-check

const starterCategories = [
  {
    slug: "society",
    name: "Samfunn og politikk",
    description: "",
  },
  {
    slug: "solidarity",
    name: "Solidaritet og bistand",
    description: "",
  },
  {
    slug: "religion",
    name: "Religion og livssyn",
    description: "",
  },
  {
    slug: "minorities",
    name: "Minoriteter",
    description: "",
  },
  {
    slug: "welfare",
    name: "Velferd",
    description: "",
  },
  {
    slug: "culture",
    name: "Kultur",
    description: "",
  },
  {
    slug: "sports",
    name: "Idrett",
    description: "",
  },
  {
    slug: "public-security",
    name: "Beredskap",
    description: "",
  },
  {
    slug: "children",
    name: "Barn og ungdom",
    description: "",
  },
  {
    slug: "technology",
    name: "Teknologi",
    description: "",
  },
  {
    slug: "other",
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

    table.string("slug").notNullable().unique()
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
