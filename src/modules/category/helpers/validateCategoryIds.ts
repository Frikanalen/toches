import { createResourceListValidator } from "../../validation/helpers/createResourceListValidator"
import { categoryModel } from "../models/categoryModel"

export const validateCategoryIds = () =>
  createResourceListValidator({
    tableName: categoryModel.tableName,
    resourceName: categoryModel.structure.property,
    requireUnique: true,
  })
