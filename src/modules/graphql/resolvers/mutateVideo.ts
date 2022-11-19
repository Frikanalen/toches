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

const createVideo = async ({
  title,
  description,
  mediaId,
  organizationId,
}: VideoInput): Promise<string> => {
  // FIXME: Must check if mediaId is valid here!
  // Does media exist? does media belong to user? etc
  const validatedMediaId = parseInt(mediaId || "")
  if (isNaN(validatedMediaId)) throw new GraphQLError("mediaId is required")

  const validatedOrgId = parseInt(organizationId || "")
  if (isNaN(validatedOrgId)) throw new GraphQLError("organizationId is required")

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
> = async (_, { input }, context) => {
  if (input.id) await requireVideoOwner(context, input.id)

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
  if (isNaN(parseInt(videoId || ""))) throw new GraphQLError("videoId is invalid")
  await requireVideoOwner(context, videoId)
  await db("videos")
    .update("published", info.fieldName === "publish")
    .where("id", parseInt(videoId))
  const video = await videoGet(videoId)

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
  if (isNaN(parseInt(videoId || ""))) throw new GraphQLError("videoId is invalid")
  await requireVideoOwner(context, videoId)
  const rows = await db("videos").delete().where("id", parseInt(videoId))

  return {
    status: rows === 1 ? MutationStatus.Success : MutationStatus.Error,
  }
}
