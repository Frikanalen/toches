import { array, InferType, number, object, string } from "yup"

export const jukeboxSchema = object({
  from: string().required(),
  to: string().required(),
  entries: array(
    object({
      video: number().required(),
      startsAt: string().required(),
    }),
  ).required(),
})

export type ValidatedJukebox = InferType<typeof jukeboxSchema>
