import { toCamelCase } from "./string"

test("toCamelCase", () => {
  expect(toCamelCase("snake_case")).toBe("snakeCase")
  expect(toCamelCase("snake_case_with_many_underscores")).toBe(
    "snakeCaseWithManyUnderscores",
  )
})
