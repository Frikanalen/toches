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
 *          description: Original file name as uploaded on client
 *        locator:
 *          type: string
 *          description: Location of file (see locator format)
 *        duration:
 *          type: number
 *          description: Duration in seconds
 *        metadata:
 *          type: object
 *          description: File metadata as returned by ffprobe
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
