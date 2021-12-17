import { Model } from "../../db/classes/Model"

export type CategoryData = {
  id: number

  key: string
  name: string
  description: string
}

export const categoryModel = new Model<CategoryData>({
  tableName: "categories",
  columns: ["id", "key", "name", "description"],
  structure: {
    prefix: "category",
    property: "category",
  },
})
