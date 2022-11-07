import { fkweb } from "./fkwebDatabase"
import { db } from "../db"
import { FkOrganization, Organizations } from "../tableTypes"

// TODO: Fix editorId and fkmember, resolve non-unique brregId

export const migrateOrganizations = async () => {
  await db.transaction(async (trx) => {
    await db("organizations").delete()

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
            return await db<Organizations>("organizations")
              .insert({
                brreg_number,
                description,
                editor_id: editor_id || 0,
                homepage,
                id,
                name,
                postal_address: postal_address || "",
                street_address: street_address || "",
              })
              .transacting(trx)
          } catch (e) {
            console.log("skipping org")
          }
        },
      ),
    )
    await trx.commit()
  })
}
