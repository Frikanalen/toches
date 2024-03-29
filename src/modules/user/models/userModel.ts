import { RoleData } from "../../access-control/models/roleModel"
import { Model } from "../../db/classes/Model"

export type UserData = {
  id: number

  email: string
  password: string
  name: string

  createdAt: Date
  updatedAt: Date
  lastLoggedInAt: Date

  banned: boolean
  roles?: RoleData[]
}

export const userModel = new Model<UserData>({
  tableName: "users",
  columns: [
    "id",
    "email",
    "password",
    "name",
    "created_at",
    "updated_at",
    "last_logged_in_at",
    "banned",
  ],
  structure: {
    prefix: "user",
    property: "user",
    subqueries: {
      roles: {
        prefix: "role",
        property: "role",
      },
    },
  },
})
