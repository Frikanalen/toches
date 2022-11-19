import { add, parse, startOfDay } from "date-fns"
import { Middleware } from "koa"
import { getSchedule } from "./getSchedule"
import { buildProgramDescription } from "./tvAnytime/buildProgramDescription"
import { buildProgramInformationTable } from "./tvAnytime/buildProgramInformationTable"
import { buildServiceInformationTable } from "./tvAnytime/buildServiceInformationTable"
import { buildProgramLocationTable } from "./tvAnytime/buildProgramLocationTable"

// TODO: Consider validating using https://hub.docker.com/r/isaitb/xml-validator
// Schemas are here: https://github.com/ebu/tvanytime/tree/master/schemas/part31
const buildTVAnytime = async (start: Date, end: Date) => {
  const tvaProgramDescription = buildProgramDescription()
  const items = await getSchedule({ start, end })

  await buildProgramInformationTable(tvaProgramDescription, items)
  await buildProgramLocationTable(tvaProgramDescription, items, { start, end })
  await buildServiceInformationTable(tvaProgramDescription)

  return tvaProgramDescription.parent().toString()
}

export const getTVAnytimeForDay: Middleware = async (context, next) => {
  const { year, month, date } = context.params

  const startTime = startOfDay(
    parse(`${year}/${month}/${date}`, "yyyy/MM/dd", new Date()),
  )
  const endTime = add(startTime, { days: 1 })

  try {
    context.type = "application/xml"
    context.body = await buildTVAnytime(startTime, endTime)
    context.status = 200
  } catch (e: any) {
    context.type = "text/plain"

    context.body = e.message
    context.status = 500
  }
  return next()
}
