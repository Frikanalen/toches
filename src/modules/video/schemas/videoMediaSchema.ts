import { InferType, number, object, string } from "yup"

/**
 *@openapi
 *components:
 *  schemas:
 *    VideoMediaForm:
 *      type: object
 *      properties:
 *        fileName:
 *          type: string
 *        locator:
 *          type: string
 *        duration:
 *          type: number
 *        metadata:
 *          type: object
 *      required:
 *        - fileName
 *        - locator
 *        - duration
 *        - metadata
 */
export const videoMediaSchema = object({
  fileName: string().required(),
  locator: string().required(),
  duration: number().required(),
  metadata: object().required(),
})

export type ValidatedVideoMedia = InferType<typeof videoMediaSchema>
