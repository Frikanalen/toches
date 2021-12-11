import { InferType, object, string } from "yup"

/**
 * @openapi
 * components:
 *   schemas:
 *     UpdateUserForm:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *           maxLength: 255
 *         lastName:
 *           type: string
 *           maxLength: 255
 *       required:
 *         - firstName
 *         - lastName
 */
export const updateUserSchema = object({
  firstName: string().required().max(255),
  lastName: string().required().max(255),
})

export type ValidatedUpdatedUser = InferType<typeof updateUserSchema>
