import { fkweb } from "./fkwebDatabase"
import { db } from "../db"
import { FkVideo, Organizations, Videos } from "../tableTypes"
import { getOriginalIds } from "./migrateVideoFiles"

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
        if (!organization_id) {
          console.log(`Skipping video ${id} because organization_id is null`)
          return
        }
        if (!knownOrganizations.find((id) => id === organization_id)) {
          console.log(`Skipping video ${id} because organization ${id} is gone`)
          return
        }
        if (!originals[id]) {
          console.log(`Skipping video ${id} because no media attached`)
          return
        }
        try {
          return await db<Videos>("videos").insert({
            id,
            title: name,
            description: header || "",
            organization_id: organization_id!,
            jukeboxable: is_filler,
            created_at: created_time || new Date(),
            media_id: originals[id],
          })
        } catch (e) {
          console.log("skipping video")
          console.log(e)
        }
      },
    ),
  )
}
