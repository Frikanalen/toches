import { format } from "date-fns"
import libxml from "libxmljs2"
import { getSchedule } from "../common/getSchedule"

export const buildxml = async (startTime: Date, endTime: Date) => {
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
