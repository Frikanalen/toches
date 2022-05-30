import { db } from "../../db/db"

interface Video {
  title: string
  id: string
}

export default {
  Query: {
    videos: async () => db.select(["*"]).table("videos"),
  },
}
