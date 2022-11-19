// Bog-standard Interval does not ensure start and end are Date
export type ScheduleInterval = { start: Date; end: Date }

export type ScheduleEntryLive = ScheduleEntryBase & {
  type: "live"
}

export type ScheduleEntryVideo = ScheduleEntryBase & {
  type: "video"
}

type ScheduleEntryBase = {
  id: string
  title: string
  description: string
  url: string
  crid: string
  start: Date
  end: Date
  organizationId: number
  organizationName: string
  duration: number
}

export type ScheduleEntry = ScheduleEntryVideo | ScheduleEntryLive
