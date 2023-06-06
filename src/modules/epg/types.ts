// Bog-standard Interval does not ensure start and end are Date
import { Scalars } from "../../generated/graphql"

export type ScheduleInterval = { start: Date; end: Date }

export type PresentationEventLive = BasePresentationEvent & {
  type: "live"
}

export type PresentationEventVideo = BasePresentationEvent & {
  type: "video"
}

type BasePresentationEvent = {
  id: Scalars["ID"]["output"]
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

export type PresentationEvent = PresentationEventVideo | PresentationEventLive
