import { buildxml } from "./buildXMLTV"
import { Middleware } from "koa"
import { add, parse, startOfDay } from "date-fns"

export const getXMLTVForDay: Middleware = async (context, next) => {
  const { year, month, date } = context.params

  const startTime = add(
    startOfDay(parse(`${year}/${month}/${date}`, "yyyy/MM/dd", new Date())),
    {
      seconds: 1, // to be bug-compatible with legacy
    },
  )
  const endTime = add(startTime, { days: 1 })

  context.type = "application/xml"
  context.body = await buildxml(startTime, endTime)
  context.status = 200

  return next()
}
