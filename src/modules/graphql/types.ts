import {
  LiveVideo,
  Organization,
  Scalars,
  ScheduleItem,
  SchedulePagination,
  User,
  UserRole,
  Video,
  VideoPagination,
  VideoSearchResults,
} from "../../generated/graphql"
import { DeepPartial } from "utility-types"
import { app } from "../core/app"

export type TochesContext = typeof app.context

export type LiveVideoWithKeys = DeepPartial<LiveVideo> & {
  id: Scalars["ID"]
  organizationId: number
}

export type VideoWithKeys = DeepPartial<Video> & {
  id: Scalars["ID"]
  organizationId: number
  mediaId: Scalars["ID"]
}

export type OrganizationWithKeys = DeepPartial<Organization> & {
  id: Scalars["ID"]
  editorId: Scalars["ID"]
}

export type ScheduleItemWithKeys = DeepPartial<ScheduleItem> & {
  id?: Scalars["ID"]["output"]
  videoId?: Scalars["ID"]["output"]
  liveId?: Scalars["ID"]["output"]
}

export type SchedulePaginationWithKeys = DeepPartial<SchedulePagination> & {
  items: ScheduleItemWithKeys[]
}

export type VideoPaginationWithKeys = DeepPartial<VideoPagination> & {
  items: VideoWithKeys[]
}

export type VideoSearchResultsWithKeys = DeepPartial<VideoSearchResults> & {
  items: VideoWithKeys[]
}

export type UserWithKeys = DeepPartial<User> & Pick<User, "id">

export type UserRoleWithKeys = DeepPartial<UserRole> & { organizationId: number }
