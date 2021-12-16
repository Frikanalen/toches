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

  organization: OrganizationData
  assets: VideoMediaAssetData[]

  createdAt: Date
  updatedAt: Date

  viewCount: number
}

export const videoModel = new Model<VideoData>({
  tableName: "videos",
  columns: ["id", "title", "description", "organization_id", "media_id", "view_count"],
  structure: {
    prefix: "video",
    property: "video",
    children: [{ ...organizationModel.structure, property: "organization" }],
  },
})
