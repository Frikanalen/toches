import { db } from "../../db/db"
import { bulletinModel } from "../model"
import { ValidatedBulletin } from "../schema"
import { getBulletin } from "./getBulletin"

export const createBulletin = async (data: ValidatedBulletin) => {
  const { title, text } = data

  const [{ id }] = await db
    .insert({
      title,
      text,
    })
    .into(bulletinModel.tableName)
    .returning<{ id: number }[]>("id")

  return getBulletin(id)
}
