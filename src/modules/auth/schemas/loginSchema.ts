import { object, string } from "yup"

export const loginSchema = object({
  email: string().required(),
  password: string().required(),
})
