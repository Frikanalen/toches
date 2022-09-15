// The TypeScript definitions below are automatically generated.
// Do not touch them, or risk, your modifications being lost.

export enum Table {
  AuthGroup = "auth_group",
  AuthGroupPermissions = "auth_group_permissions",
  AuthPermission = "auth_permission",
  AuthtokenToken = "authtoken_token",
  Bulletins = "bulletins",
  Categories = "categories",
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
}
