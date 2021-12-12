import { ASSIGNED_PERMISSIONS, ROOT_ROLE_NAME } from "../constants"
import { getRolePermissions } from "./getRolePermissions"

test("getRolePermissions", () => {
  expect(getRolePermissions([ROOT_ROLE_NAME])).toStrictEqual(
    ASSIGNED_PERMISSIONS[ROOT_ROLE_NAME],
  )
})
