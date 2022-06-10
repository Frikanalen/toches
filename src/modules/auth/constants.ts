// This should be increased when CPUs catch up
import { log } from "../core/log"

export const BCRYPT_COST_FACTOR = 12

export const SESSION_COOKIE = "fk:session"
export const CSRF_COOKIE = "fk:csrf"
export const CSRF_HEADER = "X-CSRF-Token"
export const CSRF_SAFE_METHODS = ["GET", "HEAD", "OPTIONS", "TRACE"]

export const SECRET_KEY_HEADER = "X-Api-Key"
export const SECRET_KEY = process.env.FK_API_KEY

if (!SECRET_KEY) {
  log.warn(
    "Warning: FK_API_KEY is not set, this means internal endpoints will be unreachable",
  )
}
