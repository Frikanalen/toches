import {
  MutationStatus,
  Resolver,
  VideoInput,
  VideoMutationPayload,
  VideoMutationsDeleteArgs,
  VideoMutationsPublishArgs,
  VideoMutationsUpdateArgs,
} from "../../../generated/graphql"
import { TochesContext } from "../types"
import { Videos } from "../../../generated/tableTypes"
import { db } from "../../db/db"
import { GraphQLError } from "graphql"
import { videoGet } from "./resolveVideoGet"
import { DeepPartial } from "utility-types"
import { requireVideoOwner } from "../utils/requireVideoOwner"
import { DatabaseKey } from "../utils/requireOrganizationEditor"

const updateVideo = async ({
  id,
  title,
  description,
}: VideoInput & Pick<VideoInput, "id">): Promise<string> =>
  db<Videos>("videos")
    .where("id", id)
    .update({
      title: title || undefined,
      description: description || undefined,
      updated_at: new Date(),
    })
    .returning<{ id: string }[]>("id")
    .then((row) => row[0]?.id)

const validateId = (id: DatabaseKey | undefined | null) => {
  if (!id) throw new GraphQLError("id is required")
  const validatedId = typeof id === "number" ? id : parseInt(id || "")
  if (isNaN(validatedId)) throw new GraphQLError("id is required")
  return validatedId
}

const createVideo = async ({
  title,
  description,
  mediaId,
  organizationId,
}: VideoInput): Promise<string> => {
  // FIXME: Must check if mediaId is valid here!
  // Does media exist? does media belong to user? etc
  const validatedMediaId = validateId(mediaId)
  const validatedOrgId = validateId(organizationId)

  return db<Videos>("videos")
    .insert({
      media_id: validatedMediaId,
      title: title || undefined,
      description: description || undefined,
      organization_id: validatedOrgId,
    })
    .returning<{ id: string }[]>("id")
    .then((row) => row[0]?.id)
}

export const mutateVideo: Resolver<
  DeepPartial<VideoMutationPayload>,
  any,
  TochesContext,
  VideoMutationsUpdateArgs
> = async (_, { input }, { session }) => {
  if (input.id) await requireVideoOwner(session, input.id)

  const updatedId = input.id ? await updateVideo(input) : await createVideo(input)

  const video = await videoGet(updatedId)

  return {
    status: video ? MutationStatus.Success : MutationStatus.Error,
    video,
  }
}

export const mutateVideoPublish: Resolver<
  DeepPartial<VideoMutationPayload>,
  any,
  TochesContext,
  VideoMutationsPublishArgs
> = async (_, { videoId }, context, info) => {
  const validatedVideoId = validateId(videoId)
  await requireVideoOwner(context.session, videoId)
  await db("videos")
    .update("published", info.fieldName === "publish")
    .where("id", validatedVideoId)
  const video = await videoGet(validatedVideoId)

  return {
    status: MutationStatus.Success,
    video,
  }
}

export const mutateVideoDelete: Resolver<
  DeepPartial<VideoMutationPayload>,
  any,
  TochesContext,
  VideoMutationsDeleteArgs
> = async (_, { videoId }, context) => {
  const validatedVideoId = validateId(videoId)
  await requireVideoOwner(context.session, validatedVideoId)
  const rows = await db("videos").delete().where("id", validatedVideoId)

  return {
    status: rows === 1 ? MutationStatus.Success : MutationStatus.Error,
  }
}
