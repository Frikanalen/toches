import { Middleware } from "koa"
import swagger from "swagger-jsdoc"
import { SESSION_COOKIE } from "../../auth/constants"
import { log } from "../log"

const buildOAPI = (): Record<string, any> => {
  log.info("Generating OpenAPI spec")

  const createMessage = (message: string) => ({
    type: "object",
    properties: {
      message: {
        type: "string",
        default: message,
        example: message,
      },
    },
  })

  const newOpenApiSpec = swagger({
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Frikanalen API",
        description: "RESTful API for consuming and interacting with Frikanalen",
        version: "2.0.0",
      },
      servers: [
        {
          url: "https://beta.frikanalen.no/api/v2",
          description: "Staging server",
        },
        {
          url: "http://localhost:8080",
          description: "Local development",
        },
      ],
      components: {
        securitySchemes: {
          cookie: {
            type: "apiKey",
            in: "cookie",
            name: SESSION_COOKIE,
          },
        },
        parameters: {},
        responses: {
          PermissionDenied: {
            description: "You don't have the required permissions to perform this action",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      default: "Permission denied",
                      example: "Permission denied",
                    },
                    details: {
                      type: "array",
                      example: [
                        "You must be the organization editor to do that",
                        "You need the ATEM_CONTROL role permission",
                      ],
                      items: {
                        type: "string",
                      },
                    },
                  },
                },
              },
            },
          },
          AuthenticationRequired: {
            description: "Authentication is required for this request",
            content: {
              "application/json": {
                schema: createMessage("Authentication required"),
              },
            },
          },
          ResourceNotFound: {
            description: "The requested resource was not found",
            content: {
              "application/json": {
                schema: createMessage("Not found"),
              },
            },
          },
        },
      },
      tags: [
        {
          name: "Authentication",
        },
      ],
    },
    apis: ["./src/**/*.ts"],
  })

  log.info("OpenAPI generation complete")
  return newOpenApiSpec
}

export const openApiSpec = buildOAPI()

export const sendOpenApiSpec = (): Middleware => (context, next) => {
  context.body = openApiSpec
  return next()
}
