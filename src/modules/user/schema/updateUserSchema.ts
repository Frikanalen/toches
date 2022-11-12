import { InferType, object, string } from "yup"

/**
 * @openapi
 * components:
 *   schemas:
 *     UpdateUserForm:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           maxLength: 255
 *       required:
 *         - name
 */
export const updateUserSchema = object({
  name: string().required().max(255),
})

export type ValidatedUpdatedUser = InferType<typeof updateUserSchema>
