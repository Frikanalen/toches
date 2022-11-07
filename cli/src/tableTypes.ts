// Manually copied in from the other source tree to prevent the root directory
// from being... it's a whole thing.

// The TypeScript definitions below are automatically generated.
// Do not touch them, or risk, your modifications being lost.
type PostgresInterval = string
export enum Table {
  AuthGroup = "auth_group",
  AuthGroupPermissions = "auth_group_permissions",
  AuthPermission = "auth_permission",
  AuthtokenToken = "authtoken_token",
  Bulletins = "bulletins",
  Categories = "categories",
  DjangoAdminLog = "django_admin_log",
  DjangoContentType = "django_content_type",
  DjangoMigrations = "django_migrations",
  DjangoSession = "django_session",
  FkAsrun = "fk_asrun",
  FkAsset = "fk_asset",
  FkCategory = "fk_category",
  FkFileformat = "fk_fileformat",
  FkIngestjob = "fk_ingestjob",
  FkOrganization = "fk_organization",
  FkOrganizationMembers = "fk_organization_members",
  FkScheduleitem = "fk_scheduleitem",
  FkSchedulepurpose = "fk_schedulepurpose",
  FkSchedulepurposeDirectVideos = "fk_schedulepurpose_direct_videos",
  FkUser = "fk_user",
  FkVideo = "fk_video",
  FkVideoCategories = "fk_video_categories",
  FkVideofile = "fk_videofile",
  FkWeeklyslot = "fk_weeklyslot",
  JukeboxEntries = "jukebox_entries",
  KnexMigrations = "knex_migrations",
  KnexMigrationsLock = "knex_migrations_lock",
  NewsBulletin = "news_bulletin",
  OrganizationMembers = "organization_members",
  Organizations = "organizations",
  PlaylistEntries = "playlist_entries",
  Playlists = "playlists",
  RoleUserMap = "role_user_map",
  Roles = "roles",
  Sessions = "sessions",
  Users = "users",
  VideoCategoryMap = "video_category_map",
  VideoMedia = "video_media",
  VideoMediaAssets = "video_media_assets",
  Videos = "videos",
}

export type AuthGroup = {
  id: number
  name: string
}

export type AuthGroupPermissions = {
  id: number
  group_id: number
  permission_id: number
}

export type AuthPermission = {
  id: number
  name: string
  content_type_id: number
  codename: string
}

export type AuthtokenToken = {
  key: string
  created: Date
  user_id: number
}

export type Bulletins = {
  id: number
  title: string
  text: string | null
  created_at: Date
  updated_at: Date
}

export type Categories = {
  id: number
  key: string
  name: string
  description: string
}

export type DjangoAdminLog = {
  id: number
  action_time: Date
  object_id: string | null
  object_repr: string
  action_flag: unknown
  change_message: string
  content_type_id: number | null
  user_id: number
}

export type DjangoContentType = {
  id: number
  app_label: string
  model: string
}

export type DjangoMigrations = {
  id: number
  app: string
  name: string
  applied: Date
}

export type DjangoSession = {
  session_key: string
  session_data: string
  expire_date: Date
}

export type FkAsrun = {
  id: number
  created: Date
  modified: Date
  program_name: string
  playout: string
  played_at: Date
  in_ms: number
  out_ms: number | null
  video_id: number | null
}

export type FkAsset = {
  id: number
  asset_type: string
  location: string
  video_id: number
}

export type FkCategory = {
  id: number
  name: string
  desc: string
}

export type FkFileformat = {
  id: number
  description: string | null
  fsname: string
  vod_publish: boolean
  mime_type: string | null
}

export type FkIngestjob = {
  id: number
  job_type: string
  percentage_done: number
  status_text: string
  state: string
  video_id: number
}

export type FkOrganization = {
  id: number
  name: string
  description: string
  fkmember: boolean
  orgnr: string
  homepage: string | null
  editor_id: number | null
  street_address: string | null
  postal_address: string | null
}

export type FkOrganizationMembers = {
  id: number
  organization_id: number
  user_id: number
}

export type FkScheduleitem = {
  id: number
  default_name: string
  schedulereason: number
  starttime: Date
  duration: PostgresInterval
  video_id: number | null
}

export type FkSchedulepurpose = {
  id: number
  name: string
  type: string
  strategy: string
  organization_id: number | null
}

export type FkSchedulepurposeDirectVideos = {
  id: number
  schedulepurpose_id: number
  video_id: number
}

export type FkUser = {
  id: number
  password: string
  last_login: Date | null
  is_superuser: boolean
  first_name: string
  last_name: string
  email: string
  is_active: boolean
  date_joined: Date
  date_of_birth: Date | null
  identity_confirmed: boolean
  phone_number: string
}

export type FkVideo = {
  id: number
  header: string | null
  name: string
  description: string | null
  has_tono_records: boolean
  is_filler: boolean
  publish_on_web: boolean
  proper_import: boolean
  played_count_web: number
  created_time: Date | null
  updated_time: Date | null
  uploaded_time: Date | null
  framerate: number
  ref_url: string
  duration: PostgresInterval
  upload_token: string
  creator_id: number
  organization_id: number | null
  media_metadata: unknown
}

export type FkVideoCategories = {
  id: number
  video_id: number
  category_id: number
}

export type FkVideofile = {
  id: number
  filename: string
  integrated_lufs: number | null
  truepeak_lufs: number | null
  created_time: Date | null
  format_id: number
  video_id: number
}

export type FkWeeklyslot = {
  id: number
  day: number
  start_time: string
  duration: PostgresInterval
  purpose_id: number | null
}

export type JukeboxEntries = {
  id: number
  video_id: number
  starts_at: Date
}

export type KnexMigrations = {
  id: number
  name: string | null
  batch: number | null
  migration_time: Date | null
}

export type KnexMigrationsLock = {
  index: number
  is_locked: number | null
}

export type NewsBulletin = {
  id: number
  heading: string
  text: string
  created: Date
  is_published: boolean
}

export type OrganizationMembers = {
  id: number
  user_id: number
  organization_id: number
}

export type Organizations = {
  id: number
  brreg_number: number | null
  name: string
  description: string | null
  homepage: string | null
  postal_address: string
  street_address: string
  editor_id: number
  created_at: Date
  updated_at: Date
}

export type PlaylistEntries = {
  id: number
  index: number
  playlist_id: number
  video_id: number
}

export type Playlists = {
  id: number
  title: string
  description: string | null
  organization_id: number
}

export type RoleUserMap = {
  id: number
  role_id: number
  user_id: number
}

export type Roles = {
  id: number
  name: string
}

export type Sessions = {
  id: number
  key: string
  maxAge: number
  session: unknown
}

export type Users = {
  id: number
  email: string
  password: string
  first_name: string
  last_name: string
  created_at: Date
  updated_at: Date
  last_logged_in_at: Date | null
  banned: boolean
}

export type VideoCategoryMap = {
  id: number
  category_id: number
  video_id: number
}

export type VideoMedia = {
  id: number
  file_name: string
  locator: string
  duration: number
  metadata: unknown
  created_at: Date
}

export type VideoMediaAssets = {
  id: number
  locator: string
  type: string
  metadata: unknown | null
  media_id: number
}

export type Videos = {
  id: number
  title: string
  description: string | null
  uploader_id: number | null
  organization_id: number
  media_id: number
  created_at: Date
  updated_at: Date
  view_count: number
  jukeboxable: boolean
  published: boolean
}
