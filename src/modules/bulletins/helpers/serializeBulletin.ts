import { BulletinData } from "../model"

/**
 * @openapi
 * components:
 *  schemas:
 *    Bulletin:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *        title:
 *          type: string
 *        text:
 *          type: string
 *        createdAt:
 *          type: string
 *          format: date-time
 *        updatedAt:
 *          type: string
 *          format: date-time
 */
export const serializeBulletin = (bulletin: BulletinData) => bulletin
