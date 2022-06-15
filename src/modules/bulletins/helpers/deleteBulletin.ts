import { Middleware } from "koa"
import { db } from "../../db/db"

export const deleteBulletin = (): Middleware => async (context, next) => {
  const id = parseInt(context.params.id)

  if (isNaN(id)) context.throw("400", "invalid arguments")

  const affectedRows = await db.delete().from("bulletins").where("id", id)

  if (!affectedRows) context.throw("404", "no such bulletin")

  context.status = 204

  return next()
}
