import {
  add,
  format,
  parse,
  startOfDay,
  areIntervalsOverlapping,
  compareAsc,
} from "date-fns"
import libxml from "libxmljs2"
import { db } from "../db/db"
import { ScheduleItem } from "../../generated/graphql"
import { Middleware } from "koa"

const buildxml = async (startTime: Date, endTime: Date) => {
  const doc = new libxml.Document()
  const tv = doc.node("tv")

  const jukeboxItems = await db<ScheduleItem>("jukebox_entries")
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
    .andWhere("starts_at", "<=", endTime.toISOString())
    .andWhere("starts_at", ">=", startTime.toISOString())
    .orderBy("starts_at")

  const lives = await db("live_programmes")
    .select(["id", "title", "description", "duration"])
    .select({
      startsAt: "starts_at",
      endsAt: db.raw("(starts_at + duration * INTERVAL '1 second')"),
    })
    .where("starts_at", "<=", endTime.toISOString())
    .andWhere("starts_at", ">=", startTime.toISOString())

  const items = [
    ...jukeboxItems.filter(({ startsAt, endsAt }) => {
      const itemLasts = { start: startsAt, end: endsAt }

      return !!lives.find(({ startsAt, endsAt }) => {
        const liveLasts = { start: startsAt, end: endsAt }

        return !areIntervalsOverlapping(liveLasts, itemLasts)
      })
    }),
    ...lives,
  ].sort((a, b) => compareAsc(a.startsAt, b.startsAt))

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
    p.node(
      "url",
      item.videoId
        ? `https://frikanalen.no/video/${item.videoId}/`
        : "https://frikanalen.no/",
    )
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
