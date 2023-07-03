import { fkweb } from "./fkwebDatabase"
import { db } from "../db"
import { FkVideo, Organizations, Videos } from "../tableTypes"
import { getOriginalIds } from "./migrateVideoFiles"
import { log } from "./log"

// TODO: Fix editorId and fkmember, resolve non-unique brregId
// TODO: Resolve description issue, discontinuity between SQL schema and GraphQL schema
//    Graph returns Cannot return null for non-nullable field Video.description.
//    Hotfixed by giving an empty string fallback

export const migrateVideos = async () => {
  const originals = await getOriginalIds()
  const query = await fkweb<FkVideo>("fk_video")
  const knownOrganizations = (await db<Organizations>("organizations").select("id")).map(
    ({ id }) => id,
  )

  await Promise.all(
    query.map(
      async ({
        id,
        name,
        header,
        organization_id,
        description,
        created_time,
        creator_id,
        duration,
        framerate,
        has_tono_records,
        is_filler,
        media_metadata,
        played_count_web,
        publish_on_web,
        ref_url,
        updated_time,
        uploaded_time,
        upload_token,
        proper_import,
      }) => {
        // Validation errors
        if (!organization_id) {
          log.warn(`Skipping video ${id} because organization_id is null`)
          return
        }
        if (!knownOrganizations.find((id) => id === organization_id)) {
          log.warn(`Skipping video ${id} because organization ${id} is gone`)
          return
        }
        if (!originals[id]) {
          log.warn(`Skipping video ${id} because no media attached`)
          return
        }
        //
        // Validation warnings
        //
        if (header === "") {
          log.info(`Video #${id}: ${name} has empty header.`)
        }

        try {
          return await db<Videos>("videos").insert({
            id,
            title: name,
            description: header || "",
            organization_id: organization_id!,
            jukeboxable: is_filler,
            created_at: created_time || uploaded_time || updated_time || new Date(),
            updated_at: updated_time || new Date(),
            media_id: originals[id],
            published: publish_on_web,
          })
        } catch (e) {
          log.warn(`Skipping video ${id} due to database error`)
          console.log(e)
        }
      },
    ),
  )

  await db.raw("SELECT setval('videos_id_seq', (SELECT MAX(id) FROM videos));")
}
