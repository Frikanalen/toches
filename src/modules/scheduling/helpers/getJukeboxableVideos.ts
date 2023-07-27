import Objection, { Model, knexSnakeCaseMappers } from "objection"
import knex from "knex"

const config = require("../../../../knexfile")

const db = knex({
  ...config.postgres,
  ...knexSnakeCaseMappers(),
})

class OrganizationModel extends Model {
  static tableName = "organizations"

  static get modifiers() {
    return {
      onlyActive(builder: Objection.QueryBuilder<OrganizationModel>) {
        builder.where("active", true)
      },
      nameAndId(builder: Objection.QueryBuilder<OrganizationModel>) {
        builder.select("name", "id")
      },
    }
  }
}

class VideoMediaAssetModel extends Model {
  static tableName = "video_media_assets"
}

class VideoMediaModel extends Model {
  static tableName = "video_media"
}

class VideoCategoryModel extends Model {
  static tableName = "categories"

  static get modifiers() {
    return {
      nameAndId(builder: Objection.QueryBuilder<VideoCategoryModel>) {
        builder.select("categories.name", "categories.id")
      },
    }
  }
}

class VideoModel extends Model {
  static tableName = "videos"

  static relationMappings = {
    organization: {
      relation: Model.BelongsToOneRelation,
      modelClass: OrganizationModel,
      join: {
        from: "videos.organizationId",
        to: "organizations.id",
      },
    },

    asset: {
      relation: Model.HasManyRelation,
      modelClass: VideoMediaAssetModel,
      join: {
        from: "videos.mediaId",
        to: "video_media_assets.mediaId",
      },
    },

    media: {
      relation: Model.BelongsToOneRelation,
      modelClass: VideoMediaModel,
      join: {
        from: "videos.mediaId",
        to: "video_media.id",
      },
    },

    categories: {
      relation: Model.ManyToManyRelation,
      modelClass: VideoCategoryModel,
      join: {
        from: "videos.id",
        through: {
          from: "video_category_map.videoId",
          to: "video_category_map.categoryId",
        },
        to: "categories.id",
      },
    },
  }
}

export const getJukeboxableVideos = async () => {
  const videos = await VideoModel.query(db)
    .select(
      "videos.id",
      "title",
      "media.duration",
      "videos.createdAt",
      Model.raw("array_agg(categories.id) as categories"),
    )
    .where("videos.jukeboxable", true)
    .where("videos.published", true)
    .where("videos.tonoEncumbered", false)
    .where("organization.active", true)
    .joinRelated("[media, categories, organization]")
    .withGraphFetched("[organization(nameAndId)]")
    .groupBy("videos.id", "media.id")

  return videos
}
