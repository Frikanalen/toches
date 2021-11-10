import { object, string } from "yup"

export const userSchema = object({
  email: string().email().required().max(255),
  password: string().required().max(255).min(8),
  firstName: string().required().max(255),
  lastName: string().required().max(255),
})
