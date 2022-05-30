import { ApolloServer, gql } from "apollo-server-koa"
import { readdirSync, readFileSync } from "fs"
import { join as pathJoin } from "path"
import { DateTimeResolver, DateTimeTypeDefinition } from "graphql-scalars"

const errorHandler = (err: Error) => {
  console.log("Error while running resolver", {
    error: err,
  })

  // Hide all internals by default
  // Change that when we introduce custom error instances
  return new Error("Internal server error")
}

const schemaFiles = readdirSync(pathJoin(__dirname, "schema")).filter(
  (file) => file.indexOf(".graphql") > 0,
)

// Concatanate them to create our schema
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

export const apolloServer = new ApolloServer({
  typeDefs: gql(`
      ${DateTimeTypeDefinition}
      type Query
      schema {
        query: Query
      }
      ${schema}
    `),
  resolvers: {
    DateTime: DateTimeResolver,
    Query: queryResolvers,
  },
  formatError: errorHandler,
})
