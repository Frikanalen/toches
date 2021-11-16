import { InferType, object, string } from "yup"

/**
 *  @openapi
 *  components:
 *    schemas:
 *      RegisterForm:
 *        type: object
 *        properties:
 *          email:
 *            type: string
 *            format: email
 *            maxLength: 255
 *          password:
 *            type: string
 *            format: password
 *            minLength: 8
 *            maxLength: 255
 *          firstName:
 *            type: string
 *            maxLength: 255
 *          lastName:
 *            type: string
 *            maxLength: 255
 *        required:
 *          - email
 *          - password
 *          - firstName
 *          - lastName
 */
export const userSchema = object({
  email: string().email().required().max(255).lowercase(),
  password: string().required().max(255).min(8),
  firstName: string().required().max(255),
  lastName: string().required().max(255),
})

export type ValidatedUser = InferType<typeof userSchema>
