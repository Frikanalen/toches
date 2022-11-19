import { add, parse, startOfDay } from "date-fns"
import { Middleware } from "koa"
import { getSchedule } from "./getSchedule"
import { Document } from "libxmljs2"
// @ts-ignore
import xsd from "libxmljs2-xsd"

import { formatISO } from "date-fns"

const buildTVAnytime = async (startTime: Date, endTime: Date) => {
  const doc = new Document()
  const main = doc.node("tva:TVAMain").attr({
    xmlns: "urn:tva:metadata:2019",
    "xmlns:tva": "urn:tva:metadata:2019",
    "xmlns:mpeg7": "urn:tva:mpeg7:2008",
    "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
    type: "epg",
    "xml:lang": "no",
    publisher: "Foreningen Frikanalen, tekn. ansvarlig Tore Sinding Bekkedal",
    publicationTime: formatISO(new Date()),
    rightsOwner: "frikanalen.no",
    originID: "frikanalen.no",
    "xsi:schemaLocation":
      "urn:tva:metadata:2019 http://www.nrk.no/tvanytime/xml/tva_metadata_3-1.xsd",
  })

  const ProgramDescription = main.node("tva:ProgramDescription")
  const ProgramInformationTable = ProgramDescription.node("tva:ProgramInformationTable")
  const ProgramLocationTable = ProgramDescription.node("tva:ProgramLocationTable")
  const ServiceInformationTable = ProgramDescription.node("tva:ServiceInformationTable")

  const Schedule = ProgramLocationTable.node("tva:Schedule").attr({
    serviceIDRef: "frikanalen.no",
    start: formatISO(startTime),
    end: formatISO(endTime),
  })

  const items = await getSchedule(startTime, endTime)

  const seenCRIDs: string[] = []

  items.forEach((item) => {
    if (item.crid in seenCRIDs) return

    seenCRIDs.push(item.crid)

    const BasicDescription = ProgramInformationTable.node("tva:ProgramInformation")
      .attr({
        programId: `${item.crid}`,
      })
      .node("tva:BasicDescription")

    BasicDescription.node("tva:Title", item.title).attr({ type: "main" })
    BasicDescription.node("tva:Synopsis", item.description)

    // CreditsList defined here: https://tech.ebu.ch/docs/metadata/ts_1028220301v010801p.pdf
    const CreditsList = BasicDescription.node("tva:CreditsList")
    const CreditsItem = CreditsList.node("tva:CreditsItem").attr({ role: "V20" })
    CreditsItem.node("tva:OrganizationName", item.organization_name)
    CreditsItem.node("tva:PresentationRole", "Produsert av").attr("xml:lang", "no")
  })

  items.forEach((item) => {
    const ScheduleEvent = Schedule.node("tva:ScheduleEvent")

    ScheduleEvent.node("tva:Program").attr({ crid: item.crid })
    ScheduleEvent.node("tva:InstanceMetadataId", `imi:${item.id}`)
    ScheduleEvent.node("tva:InstanceDescription").node("tva:Title", item.title)
    ScheduleEvent.node("tva:PublishedStartTime", formatISO(item.startsAt))
    ScheduleEvent.node("tva:PublishedEndTime", formatISO(item.endsAt))
    ScheduleEvent.node("tva:ActualStartTime", formatISO(item.startsAt))
    ScheduleEvent.node("tva:ActualEndTime", formatISO(item.endsAt))

    if (item.type === "live") ScheduleEvent.node("tva:Live").attr({ value: "true" })
  })

  const ServiceInformation = ServiceInformationTable.node("tva:ServiceInformation").attr({
    serviceId: "frikanaln.no",
  })
  ServiceInformation.node("tva:Name", "Frikanalen")
  ServiceInformation.node("tva:Owner", "Foreningen Frikanalen")
  ServiceInformation.node("tva:ServiceUrl", "https://frikanalen.no/").attr({
    name: "WWW",
  })
  ServiceInformation.node("tva:ServiceType").attr({
    href: "urn:nordig:metadata:cs:ServiceTypeCS:2019:linear",
  })
  ServiceInformation.node("tva:ServiceType").attr({
    href: "urn:nordig:metadata:cs:ServiceTypeCS:2019:video",
  })
  ServiceInformation.node("tva:ServiceLanguage", "no")

  const rendered = doc.toString()

  const schema = xsd.parseFile("./src/modules/epg/xmlSchemas/tva_metadata_3-1.xsd", {
    baseUrl: "./src/modules/epg/xmlSchemas/",
  })

  const validationErrors = schema.validate(rendered)
  if (validationErrors) console.log(validationErrors) // throw new Error(validationErrors.toString())

  return rendered
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
