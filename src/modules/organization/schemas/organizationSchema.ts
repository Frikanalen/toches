import { InferType } from "yup"
import { number, object, string } from "yup"

// TODO: Move this somewhere more sensible if it will be used in other schemas
const urlRegex =
  /^((http(s?)?):\/\/)?([wW]{3}\.)?[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/

/**
 * @openapi
 * components:
 *   schemas:
 *     NewOrganizationForm:
 *       type: object
 *       required:
 *         - name
 *         - postalAddress
 *         - streetAddress
 *       properties:
 *         brregNumber:
 *           type: integer
 *           description: The organization number from the Brønnøysund Register Centre. Must be exactly 9 digits.
 *           example: 991696512
 *         name:
 *           type: string
 *           minLength: 3
 *           maxLength: 255
 *         postalAddress:
 *           type: string
 *         streetAddress:
 *           type: string
 *         homepage:
 *           type: string
 *           pattern: '/^((http(s?)?):\/\/)?([wW]{3}\.)?[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/'
 *           format: url
 */
export const organizationSchema = object({
  brregNumber: number()
    .integer()
    .test(
      "length",
      "BRREG number must be exactly 9 digits",
      (v) => typeof v === "undefined" || v.toString().length === 9,
    ),
  name: string().required().min(3).max(255),
  postalAddress: string().required().max(255),
  streetAddress: string().required().max(255),
  homepage: string().matches(urlRegex, "Must be URL"),
})

export type ValidatedOrganization = InferType<typeof organizationSchema>
