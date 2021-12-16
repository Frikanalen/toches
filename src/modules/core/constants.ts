export const IS_PROD = process.env.NODE_ENV === "production"
export const IS_VERBOSE = process.env.VERBOSITY === "verbose"
export const IS_DEV = !IS_PROD

export const MEDIA_SERVER_BASE_URL = process.env.FK_MEDIA
