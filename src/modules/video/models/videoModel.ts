import { Model } from "../../db/classes/Model"
import {
  OrganizationData,
  organizationModel,
} from "../../organization/models/organizationModel"

export type VideoMediaAssetData = {
  id: number

  locator: string
  type: string

  metadata: object
}

export type VideoTableRow = {
  id: number
  title: string
  description: string
  uploader_id: number
  organization_id: number
  media_id: number
  created_at: string
  updated_at: string
  view_count: number
}

export type VideoData = {
  id: number

  title: string
  description?: string
  duration: number

  organization: OrganizationData

  assets: VideoMediaAssetData[]
  mediaId: number
  categories: { id: number }[]

  createdAt: Date
  updatedAt: Date

  viewCount: number

  jukeboxable: boolean
}

export const videoModel = new Model<VideoData>({
  tableName: "videos",
  columns: [
    "id",
    "title",
    "description",
    "organization_id",
    "created_at",
    "updated_at",
    "media_id",
    "view_count",
    "jukeboxable",
  ],
  structure: {
    prefix: "video",
    property: "video",
    children: [{ ...organizationModel.structure, property: "organization" }],
  },
})
