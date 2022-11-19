import { add, format, parse, startOfDay } from "date-fns"
import libxml from "libxmljs2"
import { Middleware } from "koa"
import { getSchedule } from "./getSchedule"

const buildxml = async (startTime: Date, endTime: Date) => {
  const doc = new libxml.Document()
  const tv = doc.node("tv")

  const items = await getSchedule({ start: startTime, end: endTime })

  tv.attr({ "generator-info-name": "fkweb.agenda.xmltv" })
    .node("channel")
    .attr({ id: "frikanalen.tv" })
    .node("display-name", "Frikanalen")
    .parent()
    .node("url", "https://frikanalen.no")

  items.forEach((item) => {
    const p = tv.node("programme")
    p.attr({
      channel: "frikanalen.tv",
      start: format(item.start, "yyyyMMddHHmmss XX"),
      stop: format(item.end, "yyyyMMddHHmmss XX"),
    })

    p.node("title", item.title).attr({ lang: "no" })
    p.node("desc", item.description).attr({ lang: "no" })
    p.node("url", item.url)
    p.node("length", Math.trunc(item.duration).toString()).attr({ units: "seconds" })
  })

  return doc.toString()
}

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
