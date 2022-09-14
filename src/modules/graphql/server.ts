import { ApolloServer, gql } from "apollo-server-koa"
import { readdirSync, readFileSync } from "fs"
import { join as pathJoin } from "path"
import { DateTimeResolver, DateTimeTypeDefinition } from "graphql-scalars"
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core"

const errorHandler = (err: Error) => {
  console.log("Error while running resolver", {
    error: err,
  })

  // Hide all internals by default
  // Change that when we introduce custom error instances
  return new Error("Internal server error")
}

// Read graphql files from schema subdirectory
const schemaFiles = readdirSync(pathJoin(__dirname, "schema")).filter(
  (file) => file.indexOf(".graphql") > 0,
)

// Concatenate them to create our schema
const schema = schemaFiles
  .map((file) => readFileSync(pathJoin(__dirname, `schema/${file}`)).toString())
  .join()

// Based on these files, bring their respective query resolvers
const queryResolvers = schemaFiles
  .map((file) => file.replace(".graphql", ""))
  .map((file) => require(pathJoin(__dirname, `queries/${file}`)).default)
  .reduce(
    (initial, current) => ({
      ...initial,
      ...current.Query,
    }),
    {},
  )

const typeDefs = gql(`
      ${DateTimeTypeDefinition}
      type Query
      schema {
        query: Query
      }
      ${schema}
`)

const resolvers = {
  DateTime: DateTimeResolver,
  Query: queryResolvers,
}

export const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  csrfPrevention: true,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  formatError: errorHandler,
})
