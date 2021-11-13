import { Model } from "../../db/classes/Model"
import { Role } from "../types"

export type RoleData = {
  id: number
  name: Role
}

export const roleModel = new Model<RoleData>({
  tableName: "roles",
  columns: ["id", "name"],
  structure: {
    prefix: "role",
    property: "role",
  },
})
