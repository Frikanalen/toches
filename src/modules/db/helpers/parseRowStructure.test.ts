import { parseRowStructure } from "./parseRowStructure"

test("parseRowStructure", () => {
  const result = parseRowStructure(
    {
      User__id: 1,
      User__email: "enitoni",
      User__created_at: "today",
      User__roles: [
        {
          Role__id: 4,
          Role__name: "admin",
        },
      ],
      UserAvatar__path: "path",
    },
    {
      prefix: "User",
      property: "user",
      children: [
        {
          prefix: "UserAvatar",
          property: "avatar",
        },
      ],
      subqueries: {
        roles: {
          prefix: "Role",
          property: "role",
        },
      },
    },
  )

  expect(result).toMatchObject({
    id: 1,
    email: "enitoni",
    createdAt: "today",
    roles: [
      {
        id: 4,
        name: "admin",
      },
    ],
    avatar: {
      path: "path",
    },
  })
})
