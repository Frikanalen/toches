import { fkweb } from "./fkwebDatabase"
import { db } from "../db"
import { FkOrganization, Organizations } from "../tableTypes"

// TODO: Fix editorId and fkmember, resolve non-unique brregId

export const migrateOrganizations = async () => {
  const query = await fkweb<FkOrganization>("fk_organization").select(
    "description",
    "editor_id",
    "fkmember",
    "homepage",
    "id",
    "name",
    "orgnr",
    "postal_address",
    "street_address",
  )

  await Promise.all(
    query.map(
      async ({
        description,
        editor_id,
        fkmember,
        homepage,
        id,
        name,
        orgnr,
        postal_address,
        street_address,
      }) => {
        const brreg_number =
          orgnr.length !== 9 && isNaN(parseInt(orgnr)) ? undefined : parseInt(orgnr)
        try {
          return await db<Organizations>("organizations").insert({
            brreg_number,
            description,
            editor_id: editor_id || 0,
            homepage,
            id,
            name,
            active: fkmember,
            postal_address: postal_address || "",
            street_address: street_address || "",
          })
        } catch (e: any) {
          switch (e.constraint) {
            case "organizations_brreg_number_unique":
              console.log(
                `skipping org "${name}" because brreg #${brreg_number} already in use`,
              )
              return
            case "organizations_name_unique":
              console.log(`skipping org #${id} "${name}" because name already in use`)
              return
            case "organizations_editor_id_foreign":
              console.log(
                `skipping org #${id} "${name}" because editor ${editor_id} no longer exists`,
              )
              return
            default:
              console.log(e)
              throw e
          }
        }
      },
    ),
  )
  await db.raw(
    "SELECT setval('organizations_id_seq', (SELECT MAX(id) FROM organizations));",
  )
}
