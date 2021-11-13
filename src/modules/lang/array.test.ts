import { resolveToValue } from "./array"

test("resolveToValue", () => {
  expect(resolveToValue(["abc"])).toBe("abc")
  expect(resolveToValue("xyz")).toBe("xyz")
})
