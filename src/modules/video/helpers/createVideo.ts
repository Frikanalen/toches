import { db } from "../../db/db"
import { videoModel } from "../models/videoModel"
import { ValidatedVideo } from "../schemas/videoSchema"
import { assignVideoCategories } from "./assignVideoCategories"
import { getVideo } from "./getVideo"
import { DatabaseKey } from "../../graphql/utils/requireOrganizationEditor"

export const createVideo = async (
  data: ValidatedVideo,
  organization: DatabaseKey,
  user: DatabaseKey,
) => {
  const [{ id }] = await db
    .insert({
      uploader_id: user,
      organization_id: organization,
      media_id: data.mediaId,
      title: data.title,
      description: data.description,
      jukeboxable: data.jukeboxable,
    })
    .into(videoModel.tableName)
    .returning<{ id: number }[]>("id")

  await assignVideoCategories(id, data.categories)

  return getVideo(id)
}
