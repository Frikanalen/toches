import { ApolloServer, UserInputError } from "apollo-server-koa"
import { readFileSync } from "fs"
import { DateTimeResolver } from "graphql-scalars"
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core"
import { getVideoAsset } from "./resolvers/getVideoAsset"
import { InputMaybe, Resolvers, Video, VideoSort } from "../../generated/graphql"
import { db } from "../db/db"
import { Videos } from "../../generated/tableTypes"
import { getOrganization } from "../organization/helpers/getOrganization"
import { getVideo } from "../video/helpers/getVideo"

const typeDefs = readFileSync(`src/modules/graphql/schema.graphql`).toString()

const getPageInfo = (count: number, page: number, perPage: number) => ({
  hasNextPage: perPage * (page + 1) <= count,
  hasPreviousPage: page > 1,
  page: page,
  perPage: perPage,
  totalItems: count,
  totalPages: count / perPage,
})

type OrderBy = {
  column: string
  order?: "desc" | "asc"
  nulls?: "first" | "last"
}

const getOrderBy = (sorts?: InputMaybe<VideoSort[]>): OrderBy[] =>
  sorts?.map((sort): OrderBy => {
    switch (sort) {
      case VideoSort.DateAsc:
        return {
          column: "created_at",
          order: "asc",
        }
      case VideoSort.DateDesc:
        return {
          column: "created_at",
          order: "desc",
        }
    }
  }) || []

const resolvers: Resolvers = {
  DateTime: DateTimeResolver,
  Query: {
    video: async (parent, args, context, info) => {
      const id = parseInt(args.id)

      const video = await getVideo(id)

      if (!video) throw new UserInputError(`Video ${id} does not exist`, { id })

      const { title, updatedAt, createdAt, description } = video

      return {
        title,
        updatedAt,
        createdAt,
        description,
        id: args.id,
      }
    },
    videos: async (parent, args, context, info) => {
      const { filter, sort, page, perPage } = args

      if (perPage < 1) throw new UserInputError("perPage minimum value is 1.")
      if (perPage > 100) throw new UserInputError("perPage maximum value is 100.")
      if (page < 1) throw new UserInputError("page minimum value is 1.")

      const videos = await db<Videos>("videos")
        .select("created_at")
        .select("title")
        .select("id")
        .select("description")
        .select("updated_at")
        .select("view_count")
        .select("media_id")
        .orderBy(getOrderBy(sort))
        .offset((page - 1) * perPage)
        .limit(perPage)

      const { videoCount } = (await db("videos").count({ videoCount: "*" }).first()) ?? {}

      if (!videoCount) throw new Error("Video count failed!")
      if (typeof videoCount !== "string") throw new Error("Video count returned string")

      const videoCountParsed = parseInt(videoCount)

      const items = videos.map(
        (video): Video => ({
          createdAt: video.created_at,
          description: video.description,
          id: video.id.toString(),
          title: video.title,
          updatedAt: video.updated_at,
          viewCount: video.view_count,
        }),
      )

      const pageInfo = getPageInfo(videoCountParsed, page, perPage)

      return {
        items,
        pageInfo,
      }
    },
  },
  Video: {
    assets: getVideoAsset,
    organization: async (parent, args, context, info) => {
      const { organization_id } = await db<number>("videos")
        .select("organization_id")
        .where("id", parent.id)
        .first()

      const { id, name } = await getOrganization(organization_id)

      return {
        id: id.toString(),
        name,
      }
    },
  },
  Organization: {},
}

export const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  csrfPrevention: true,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
})
