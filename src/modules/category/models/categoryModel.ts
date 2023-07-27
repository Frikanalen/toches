import { Model } from "../../db/classes/Model"

export type CategoryData = {
  id: number

  slug: string
  name: string
  description: string
}

export const categoryModel = new Model<CategoryData>({
  tableName: "categories",
  columns: ["id", "slug", "name", "description"],
  structure: {
    prefix: "category",
    property: "category",
  },
})
