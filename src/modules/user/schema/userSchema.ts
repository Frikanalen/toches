import { InferType, object, string } from "yup"

export const userSchema = object({
  email: string().email().required().max(255).lowercase(),
  password: string().required().max(255).min(8),
  firstName: string().required().max(255),
  lastName: string().required().max(255),
})

export type ValidatedUser = InferType<typeof userSchema>
