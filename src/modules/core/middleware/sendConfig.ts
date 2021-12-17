import { Middleware } from "koa"
import { getCategories } from "../../category/helpers/getCategories"
import { serializeCategory } from "../../category/helpers/serializeCategory"
import { MEDIA_SERVER_BASE_URL } from "../constants"

/**
 * @openapi
 * components:
 *   schemas:
 *     Config:
 *       type: object
 *       properties:
 *         servers:
 *           type: object
 *           properties:
 *             media:
 *               type: string
 *         categories:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Category'
 */
export const sendConfig = (): Middleware => async (context, next) => {
  context.body = {
    servers: {
      media: MEDIA_SERVER_BASE_URL,
    },
    categories: (await getCategories()).map(serializeCategory),
  }

  return next()
}
