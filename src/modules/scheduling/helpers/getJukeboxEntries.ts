import { db } from "../../db/db"
import { parseRowStructure } from "../../db/helpers/parseRowStructure"
import { videoModel } from "../../video/models/videoModel"
import { videoQuery } from "../../video/queries/videoQuery"
import { JukeboxEntryData } from "../types"

export const getJukeboxEntries = async (
  from: string,
  to: string,
): Promise<JukeboxEntryData[]> => {
  const query = db
    .select("j.starts_at as Entry__starts_at")
    .from("jukebox_entries AS j")
    .where("j.starts_at", ">=", from)
    .andWhere("j.starts_at", "<", to)
    .join(videoModel.tableName, "videos.id", "j.video_id")

  await videoQuery.merge({
    options: { single: true },
    query,
  })

  const rows = await query

  return rows.map(
    (r) =>
      parseRowStructure(r, {
        prefix: "Entry",
        property: "Entry",
        children: [videoModel.structure],
      }) as any,
  )
}
