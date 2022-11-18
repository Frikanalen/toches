import Router, { Middleware } from "@koa/router"
import { add, format, parse, startOfDay } from "date-fns"

import libxml from "libxmljs2"
import { db } from "../db/db"
import { ScheduleItem } from "../../generated/graphql"

const router = new Router({
  prefix: "/epg",
})

const getXMLTV: Middleware = async (context, next) => {
  const { year, month, date } = context.params

  const startTime = add(
    startOfDay(parse(`${year}/${month}/${date}`, "yyyy/MM/dd", new Date())),
    {
      seconds: 1, // to be bug-compatible with legacy
    },
  )
  const endTime = add(startTime, { days: 1 })
  const doc = new libxml.Document()
  const tv = doc.node("tv")

  const items = await db<ScheduleItem>("jukebox_entries")
    .select({
      id: "j.id",
      title: "v.title",
      startsAt: "j.starts_at",
      videoId: "j.video_id",
      description: "v.description",
      duration: "duration",
      endsAt: db.raw("(starts_at + duration * INTERVAL '1 second')"),
    })
    .fromRaw("jukebox_entries as j, videos as v, video_media as vm")
    .whereRaw("v.id = j.video_id")
    .andWhereRaw("vm.id = v.media_id")
    .andWhere("starts_at", "<=", endTime!.toISOString())
    .andWhere("starts_at", ">=", startTime!.toISOString())
    .orderBy("starts_at")

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
      start: format(item.startsAt, "yyyyMMddHHmmss XX"),
      stop: format(item.endsAt, "yyyyMMddHHmmss XX"),
    })

    p.node("title", item.title).attr({ lang: "no" })
    p.node("desc", item.description).attr({ lang: "no" })
    p.node("url", `https://frikanalen.no/video/${item.videoId}/`)
    p.node("length", Math.trunc(item.duration).toString()).attr({ units: "seconds" })
  })

  context.type = "application/xml"
  context.body = doc.toString(true)
  context.status = 200

  return next()
}

router.get("/xmltv/:year/:month/:date", getXMLTV)

export { router as XMLTVRouter }
