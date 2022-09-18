import { ApolloServer } from "apollo-server-koa"
import { readFileSync } from "fs"
import { DateTimeResolver } from "graphql-scalars"
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core"
import { getVideoAsset } from "./resolvers/getVideoAsset"
import { Resolver, Resolvers, Session } from "../../generated/graphql"
import { getUserProfile } from "./resolvers/getUserProfile"
import { resolveVideosQuery, resolveVideoQuery } from "./resolvers/getVideo"
import { resolveOrganizationQuery } from "./resolvers/organization"
import { logoutMutation } from "./resolvers/logoutMutation"
import { loginMutation } from "./resolvers/loginMutation"

const typeDefs = readFileSync(`src/modules/graphql/schema.graphql`).toString()

const resolveSessionQuery: Resolver<Session, any, any> = async (
  parent,
  args,
  context,
) => ({
  authenticated: !!context.ctx.session?.user,
})

const resolvers: Resolvers = {
  DateTime: DateTimeResolver,
  Mutation: {
    logout: logoutMutation,
    login: loginMutation,
  },
  Query: {
    video: resolveVideoQuery,
    videos: resolveVideosQuery,
    session: resolveSessionQuery,
  },
  Video: {
    assets: getVideoAsset,
    organization: resolveOrganizationQuery,
  },
  Session: { profileData: getUserProfile },
  Organization: {},
}

export const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  csrfPrevention: true,
  context: ({ ctx }) => ({ ctx }),
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
})
