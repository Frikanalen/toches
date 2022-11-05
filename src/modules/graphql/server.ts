import { ApolloServer } from "apollo-server-koa"
import { readFileSync } from "fs"
import { DateTimeResolver } from "graphql-scalars"
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core"
import { resolveVideoAssets } from "./resolvers/resolveVideoAssets"
import { Resolvers } from "../../generated/graphql"
import { resolveUser } from "./resolvers/resolveUser"
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
import { mutateBulletin } from "./resolvers/mutateBulletin"
import { mutationLogout } from "./resolvers/mutationLogout"
import { mutationLogin } from "./resolvers/mutationLogin"
import { resolveUserRoles } from "./resolvers/resolveUserRoles"
import { mutateOrganization } from "./resolvers/mutateOrganization"
import { resolveVideoImages } from "./resolvers/resolveVideoImages"
import { mutateVideo, mutateVideoPublish } from "./resolvers/mutateVideo"

const typeDefs = readFileSync(`src/modules/graphql/schema.graphql`).toString()

const resolvers: Resolvers = {
  DateTime: DateTimeResolver,
  Mutation: {
    organization: mutateOrganization,
    logout: mutationLogout,
    login: mutationLogin,
    bulletin: mutateBulletin,
    video: () => ({}),
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
    images: resolveVideoImages,
    organization: resolveOrganization,
  },
  UserRole: {
    organization: resolveOrganization,
  },
  VideoMutations: {
    create: mutateVideo,
    update: mutateVideo,
    publish: mutateVideoPublish,
    unpublish: mutateVideoPublish,
  },
  User: { roles: resolveUserRoles },
  Session: { user: resolveUser },
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
  context: ({ ctx }) => ctx, // pass Koa framework context to Apollo resolvers
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
})
