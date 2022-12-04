import { PresentationEvent, ScheduleInterval } from "../types"
import { Element } from "libxmljs2"
import { formatISO } from "date-fns"

// The program location table defines where on our linear video stream the programmes
// defined in the program information table can be located.
// Defined in TS 102 822-3-1 - 6.4.2:
// v1.8.1:  https://tech.ebu.ch/docs/metadata/ts_1028220301v010801p.pdf
export const buildProgramLocationTable = (
  tvaProgramDescription: Element,
  scheduleEntries: PresentationEvent[],
  { start, end }: ScheduleInterval,
) => {
  const tvaProgramLocationTable = tvaProgramDescription.node("tva:ProgramLocationTable")

  const tvaSchedule = tvaProgramLocationTable.node("tva:Schedule").attr({
    serviceIDRef: "frikanalen.no",
    start: formatISO(start),
    end: formatISO(end),
  })

  scheduleEntries.forEach((item) => {
    const tvaEvent = tvaSchedule.node("tva:ScheduleEvent")

    tvaEvent.node("tva:Program").attr({ crid: item.crid })
    tvaEvent.node("tva:InstanceMetadataId", `imi:${item.id}`)
    tvaEvent.node("tva:InstanceDescription").node("tva:Title", item.title)
    tvaEvent.node("tva:PublishedStartTime", formatISO(item.start))
    tvaEvent.node("tva:PublishedEndTime", formatISO(item.end))
    tvaEvent.node("tva:ActualStartTime", formatISO(item.start))
    tvaEvent.node("tva:ActualEndTime", formatISO(item.end))

    if (item.type === "live") tvaEvent.node("tva:Live").attr({ value: "true" })
  })
}
