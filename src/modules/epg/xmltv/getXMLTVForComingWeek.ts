import { buildxml } from "./buildXMLTV"
import { add, startOfDay } from "date-fns"
import { Middleware } from "koa"

export const getXMLTVForComingWeek: Middleware = async (context, next) => {
  const startTime = add(startOfDay(new Date()), {
    seconds: 1, // to be bug-compatible with legacy
  })
  const endTime = add(startTime, { days: 7 })

  context.type = "application/xml"
  context.body = await buildxml(startTime, endTime)
  context.status = 200

  return next()
}
