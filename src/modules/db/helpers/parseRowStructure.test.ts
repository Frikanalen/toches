import { parseRowStructure } from "./parseRowStructure"

test("parseRowStructure", () => {
  const result = parseRowStructure(
    {
      User__id: 1,
      User__username: "enitoni",
      UserAvatar__path: "path",
      UserCoverAvatar__path: null,
    },
    {
      prefix: "User",
      property: "user",
      children: [
        {
          prefix: "UserAvatar",
          property: "avatar",
        },
        {
          prefix: "UserCoverAvatar",
          property: "coverAvatar",
        },
      ],
    },
  )

  expect(result).toMatchObject({
    username: "enitoni",
    coverAvatar: null,
    id: 1,
    avatar: {
      path: "path",
    },
  })
})
