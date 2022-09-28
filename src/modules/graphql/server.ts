import { ApolloServer } from "apollo-server-koa"
import { readFileSync } from "fs"
import { DateTimeResolver } from "graphql-scalars"
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core"
import { resolveVideoAssets } from "./resolvers/resolveVideoAssets"
import { Resolvers } from "../../generated/graphql"
import { resolveProfile } from "./resolvers/resolveProfile"
import { resolveVideoQuery, resolveVideosQuery } from "./resolvers/getVideo"
import {
  resolveOrganization,
  resolveOrganizationEditor,
  resolveOrganizationLatestVideos,
  resolveOrganizationQuery,
} from "./resolvers/resolveOrganization"

import { resolveScheduleQuery, resolveVideo } from "./resolvers/resolveScheduleQuery"
import { resolveSessionQuery } from "./resolvers/resolveSessionQuery"
import { resolveBulletinsQuery } from "./resolvers/resolveBulletinsQuery"
import { resolveBulletinQuery } from "./resolvers/resolveBulletinQuery"
import { mutationUpdateBulletin } from "./resolvers/mutationUpdateBulletin"
import { mutationLogout } from "./resolvers/mutationLogout"
import { mutationLogin } from "./resolvers/mutationLogin"

const typeDefs = readFileSync(`src/modules/graphql/schema.graphql`).toString()

const resolvers: Resolvers = {
  DateTime: DateTimeResolver,
  Mutation: {
    logout: mutationLogout,
    login: mutationLogin,
    updateBulletin: mutationUpdateBulletin,
  },
  Query: {
    video: resolveVideoQuery,
    videos: resolveVideosQuery,
    session: resolveSessionQuery,
    organization: resolveOrganizationQuery,
    schedule: resolveScheduleQuery,
    bulletins: resolveBulletinsQuery,
    bulletin: resolveBulletinQuery,
  },
  ScheduleItem: {
    video: resolveVideo,
  },
  Video: {
    assets: resolveVideoAssets,
    organization: resolveOrganization,
  },
  Session: { profileData: resolveProfile },
  Organization: {
    latestVideos: resolveOrganizationLatestVideos,
    editor: resolveOrganizationEditor,
  },
}

export const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  csrfPrevention: true,
  context: ({ ctx }) => ctx,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
})
