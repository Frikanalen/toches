import { db } from "../../db/db"
import { CategoryData, categoryModel } from "../models/categoryModel"

export const getCategories = async () => {
  return db
    .select(categoryModel.columns)
    .from(categoryModel.tableName)
    .returning<CategoryData[]>(categoryModel.columns)
}
