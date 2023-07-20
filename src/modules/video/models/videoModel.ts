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

  original: string
  published: boolean
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
    "published",
  ],
  structure: {
    prefix: "video",
    property: "video",
    children: [{ ...organizationModel.structure, property: "organization" }],
  },
})
