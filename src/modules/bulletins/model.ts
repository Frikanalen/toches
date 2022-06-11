import { Model } from "../db/classes/Model"

export type BulletinData = {
  id: number

  title: string
  text: string

  createdAt: Date
  updatedAt: Date
}

export const bulletinModel = new Model<BulletinData>({
  tableName: "bulletins",
  columns: ["id", "title", "text", "created_at", "updated_at"],
  structure: {
    prefix: "bulletin",
    property: "bulletin",
  },
})
