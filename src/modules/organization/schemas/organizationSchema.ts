import { InferType } from "yup"
import { number, object, string } from "yup"

// TODO: Move this somewhere more sensible if it will be used in other schemas
const urlRegex =
  /^((http(s?)?):\/\/)?([wW]{3}\.)?[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/

export const organizationSchema = object({
  brregNumber: number()
    .integer()
    .test(
      "length",
      "Must be exactly 9 digits",
      (v) => typeof v === "undefined" || v.toString().length === 9,
    ),
  name: string().required().min(3).max(255),
  postalAddress: string().required().max(255),
  streetAddress: string().required().max(255),
  homepage: string().matches(urlRegex, "Must be URL"),
})

export type ValidatedOrganization = InferType<typeof organizationSchema>
