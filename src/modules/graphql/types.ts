import {
  Organization,
  Scalars,
  ScheduleItem,
  SchedulePagination,
  Video,
  VideoPagination,
} from "../../generated/graphql"
import { DeepPartial } from "utility-types"
import { app } from "../core/app"

export type TochesContext = typeof app.context

export type VideoWithDescendants = DeepPartial<Video> & {
  id: Scalars["ID"]
  organizationId: Scalars["ID"]
  mediaId: Scalars["ID"]
}

export type OrganizationWithDescendants = DeepPartial<Organization> & {
  id: Scalars["ID"]
  editorId: Scalars["ID"]
}

export type ScheduleItemWithDescendants = DeepPartial<ScheduleItem> & {
  id: Scalars["ID"]
  videoId: Scalars["ID"]
}

export type SchedulePaginationWithDescendants = DeepPartial<SchedulePagination> & {
  items: ScheduleItemWithDescendants[]
}

export type VideoPaginationWithDescendants = DeepPartial<VideoPagination> & {
  items: VideoWithDescendants[]
}
