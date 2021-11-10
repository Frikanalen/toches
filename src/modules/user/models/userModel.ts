import { Model } from "../../db/classes/Model"

export type UserData = {
  id: number

  email: string
  password: string
  firstName: string
  lastName: string

  createdAt: Date
  updatedAt: Date
  lastLoggedInAt: Date

  banned: boolean
}

export const userModel = new Model<UserData>({
  tableName: "users",
  columns: [
    "id",
    "email",
    "password",
    "first_name",
    "last_name",
    "created_at",
    "updated_at",
    "last_logged_in_at",
    "banned",
  ],
  structure: {
    prefix: "user",
    property: "user",
  },
})
