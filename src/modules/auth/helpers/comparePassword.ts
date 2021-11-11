import bcrypt from "bcrypt"

export const comparePassword = (input: string, encrypted: string) => {
  // Remove bcrypt prefix
  const [, rest] = encrypted.split("bcrypt")

  return bcrypt.compare(input, rest)
}
