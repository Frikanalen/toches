import { InferType, object, string } from "yup"

/**
 * @openapi
 * components:
 *   schemas:
 *     VideoMediaAssetForm:
 *       type: object
 *       properties:
 *         locator:
 *           type: string
 *         type:
 *           type: string
 *         metadata:
 *           type: object
 *       required:
 *         - locator
 *         - type
 */
export const videoMediaAssetSchema = object({
  locator: string().required(),
  type: string().required(),
  metadata: object(),
})

export type ValidatedVideoMediaAsset = InferType<typeof videoMediaAssetSchema>
