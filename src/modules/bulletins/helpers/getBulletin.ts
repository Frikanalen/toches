import { bulletinQuery } from "../queries"
import { bulletinModel } from "../model"

export const getBulletin = async (id: number) => {
  const [query] = await bulletinQuery.prepare({ single: true })

  query.from(bulletinModel.tableName).where("bulletins.id", id).first()

  const [bulletin] = await bulletinModel.parseFromQuery(query)

  return bulletin
}
