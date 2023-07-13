import { getAliasedColumns } from "./getAliasedColumns"

test("getAliasedColumns", () => {
  const result = getAliasedColumns({
    columns: ["id", "username"],
    table: "Users",
    aliasPrefix: "User",
  })

  expect(result).toMatchObject([
    `Users.id as User__id`,
    `Users.username as User__username`,
  ])
})
