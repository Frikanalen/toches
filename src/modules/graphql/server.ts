import { ApolloServer } from "apollo-server-koa"
import { readFileSync } from "fs"
import { DateTimeResolver } from "graphql-scalars"
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core"
import { resolveVideoAssets } from "./resolvers/resolveVideoAssets"
import { Resolvers } from "../../generated/graphql"
import { resolveUser } from "./resolvers/resolveUser"
import { resolveVideoQuery, resolveVideoList } from "./resolvers/getVideo"
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
import {
  mutateVideo,
  mutateVideoDelete,
  mutateVideoPublish,
} from "./resolvers/mutateVideo"
import { mutationRegister } from "./resolvers/mutationRegister"
import { resolveVideoSearch } from "./resolvers/resolveVideoSearch"

const typeDefs = readFileSync(`src/modules/graphql/schema.graphql`).toString()

const resolvers: Resolvers = {
  DateTime: DateTimeResolver,
  Mutation: {
    organization: mutateOrganization,
    bulletin: mutateBulletin,
    video: () => ({}),
    user: () => ({}),
  },
  Query: {
    video: () => ({}),
    session: resolveSessionQuery,
    organization: resolveOrganizationQuery,
    schedule: resolveScheduleQuery,
    bulletins: resolveBulletinsQuery,
    bulletin: resolveBulletinQuery,
  },
  ScheduleItem: {
    video: resolveVideo,
  },
  VideoQueries: {
    get: resolveVideoQuery,
    list: resolveVideoList,
    search: resolveVideoSearch,
  },
  Video: {
    assets: resolveVideoAssets,
    images: resolveVideoImages,
    organization: resolveOrganization,
  },
  UserRole: {
    organization: resolveOrganization,
  },
  UserMutations: {
    logout: mutationLogout,
    login: mutationLogin,
    register: mutationRegister,
  },
  VideoMutations: {
    create: mutateVideo,
    update: mutateVideo,
    publish: mutateVideoPublish,
    unpublish: mutateVideoPublish,
    delete: mutateVideoDelete,
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
