import { Model } from "../../db/classes/Model"

export type RoleData = {
  id: number
  name: string
}

export const roleModel = new Model<RoleData>({
  tableName: "roles",
  columns: ["id", "name"],
  structure: {
    prefix: "role",
    property: "role",
  },
})
