import { serializeVideo } from "../../video/helpers/serializeVideo"
import { PlaylistData } from "../models/playlistModel"

/**
 * @openapi
 * components:
 *   schemas:
 *     Playlist:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         title:
 *           type: string
 *         description:
 *           type: string
 */
export const serializePlaylist = (data: PlaylistData) => {
  const { id, title, description, videos } = data
  const [firstVideo] = videos

  return { id, title, description, firstVideo: serializeVideo(firstVideo) }
}
