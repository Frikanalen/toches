import { object, string } from "yup"

/**
 * @openapi
 * components:
 *   schemas:
 *     LoginForm:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           format: password
 *       required:
 *         - email
 *         - password
 */
export const loginSchema = object({
  email: string().required(),
  password: string().required(),
})
