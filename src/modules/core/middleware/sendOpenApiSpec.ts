import { Middleware } from "koa"
import swagger from "swagger-jsdoc"
import { SESSION_COOKIE } from "../../auth/constants"

console.info("Generating Open API spec...")
console.time("Generated successfully")

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

const spec = swagger({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Frikanalen API",
      description: "RESTful API for consuming and interacting with Frikanalen",
      version: "2.0.0",
    },
    servers: [
      {
        url: "https://frikanalen.no/api/v2",
        description: "Production server",
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

console.timeEnd("Generated successfully")
console.info("")

export const sendOpenApiSpec = (): Middleware => (context, next) => {
  context.body = spec
  return next()
}
