import { number, object } from "yup"
import { sendResourceList } from "../../core/middleware/sendResourceList"
import { createOrderingSchema } from "../../validation/helpers/createOrderingSchema"
import { getBulletinList } from "../helpers/getBulletinList"
import { serializeBulletin } from "../helpers/serializeBulletin"
import { bulletinOrdering } from "../queries"

export const sendBulletinList = () =>
  sendResourceList(async (options) => {
    const { offset, limit, context } = options

    const query = await object({
      editor: number(),
    })
      .concat(createOrderingSchema(bulletinOrdering))
      .validate(context.query)

    return getBulletinList({ offset, limit, ...query })
  }, serializeBulletin)
