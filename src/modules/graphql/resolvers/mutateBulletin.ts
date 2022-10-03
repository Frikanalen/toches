import {
  Bulletin,
  BulletinInput,
  MutationBulletinArgs,
  Resolver,
} from "../../../generated/graphql"
import { TochesContext } from "../types"
import { Bulletins } from "../../../generated/tableTypes"
import { db } from "../../db/db"
import { requireAdmin } from "../utils/requireAdmin"
import { getBulletin } from "./resolveBulletinQuery"

const updateBulletin = async ({
  id,
  title,
  text,
}: BulletinInput & Pick<BulletinInput, "id">): Promise<any> =>
  db<Bulletins>("bulletins")
    .where("id", id)
    .update({
      title: title || undefined,
      text: text || undefined,
      updated_at: new Date(),
    })
    .returning<{ id: string }[]>("id")
    .then((row) => row[0]?.id)

const createBulletin = async ({ title, text }: BulletinInput): Promise<string> =>
  db<Bulletins>("bulletins")
    .insert({
      title: title || undefined,
      text: text || undefined,
    })
    .returning<{ id: string }[]>("id")
    .then((row) => row[0]?.id)

export const mutateBulletin: Resolver<
  Bulletin,
  any,
  TochesContext,
  MutationBulletinArgs
> = async (_, args, context) => {
  await requireAdmin(context)

  const { bulletin } = args

  const updatedId = bulletin.id
    ? await updateBulletin(bulletin)
    : await createBulletin(bulletin)

  console.log(updatedId)
  return getBulletin(updatedId)
}
