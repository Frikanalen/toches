import Router from "@koa/router"
import { getResource } from "../core/middleware/getResource"
import { sendResource } from "../core/middleware/sendResource"
import { getPlaylist } from "./helpers/getPlaylist"
import { serializePlaylist } from "./helpers/serializePlaylist"
import { sendPlaylistList } from "./middleware/sendPlaylistList"

export const router = new Router({
  prefix: "/playlists",
})

/**
 * @openapi
 * /playlist:
 *   get:
 *     tags:
 *       - Playlist
 *     summary: Get a list of playlists
 *     parameters:
 *       - $ref: '#/components/parameters/offset'
 *       - $ref: '#/components/parameters/limit'
 *     responses:
 *       200:
 *         description: A list of playlists
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ResourceList'
 *                 - type: object
 *                   properties:
 *                     rows:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Playlist'
 */
router.get("/", sendPlaylistList())

/**
 * @openapi
 * /playlists/{id}:
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: integer
 *   get:
 *     tags:
 *       - Playlist
 *     summary: Get a specific playlist by id
 *     responses:
 *       200:
 *         description: An playlist
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Playlist'
 *       404:
 *          $ref: '#/components/responses/ResourceNotFound'
 */
router.get(
  "/:id",
  getResource((context) => getPlaylist(context.params.id)),
  sendResource(serializePlaylist),
)

export { router as playlistRouter }
