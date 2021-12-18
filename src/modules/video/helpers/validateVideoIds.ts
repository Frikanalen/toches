import { createResourceListValidator } from "../../validation/helpers/createResourceListValidator"
import { videoModel } from "../models/videoModel"

export const validateVideoIds = () =>
  createResourceListValidator({
    tableName: videoModel.tableName,
    resourceName: videoModel.structure.property,
    requireUnique: true,
  })
