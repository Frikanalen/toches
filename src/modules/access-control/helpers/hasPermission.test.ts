import { hasPermission } from "./hasPermission"

test("hasPermission", () => {
  expect(hasPermission(["root"], "ADMIN_PANEL")).toBe(true)
  expect(hasPermission([], "ADMIN_PANEL")).toBe(false)
})
