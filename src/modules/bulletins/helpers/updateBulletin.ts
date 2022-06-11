import { db } from "../../db/db"
import { ValidatedBulletin } from "../schema"
import { bulletinModel } from "../model"
import { getBulletin } from "./getBulletin"


export const updateBulletin = async (id: number, data: ValidatedBulletin) => {
  const { text, title } = data

  await db
    .update({
      text,
      title
    })
    .into(bulletinModel.tableName)
    .where("id", id)

  return getBulletin(id)
}
