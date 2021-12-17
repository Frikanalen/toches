import { Middleware } from "koa"
import { getCategories } from "../../category/helpers/getCategories"
import { MEDIA_SERVER_BASE_URL } from "../constants"

export const sendConfig = (): Middleware => async (context, next) => {
  context.body = {
    servers: {
      media: MEDIA_SERVER_BASE_URL,
    },
    categories: await getCategories(),
  }
}
