import { InferType, object, string } from "yup"

/**
 * @openapi
 * components:
 *   schemas:
 *     NewBulletinForm:
 *       type: object
 *       required:
 *         - title
 *         - text
 *       properties:
 *         title:
 *           type: string
 *           minLength: 3
 *           maxLength: 255
 *         text:
 *           type: string
 *           minLength: 3
 *           maxLength: 255
 */
export const bulletinSchema = object({
  title: string().required().min(3).max(255),
  text: string().required().min(3).max(255),
})

export type ValidatedBulletin = InferType<typeof bulletinSchema>
