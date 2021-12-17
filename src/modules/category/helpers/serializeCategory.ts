import { CategoryData } from "../models/categoryModel"

/**
 * @openapi
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *         key:
 *           type: string
 *         name:
 *           type: string
 *         description:
 *           type: string
 */
export const serializeCategory = (data: CategoryData) => data
