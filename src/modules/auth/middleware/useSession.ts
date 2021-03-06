import session from "koa-session"
import Koa from "koa"
import { db } from "../../db/db"
import { SESSION_COOKIE } from "../constants"
import { log } from "../../core/log"

export const setCookie = async (key: string, session: any, maxAge: number) => {
  await deleteCookie(key)
  return db.insert({ key, session, maxAge }).into("sessions")
}

export const getCookie = async (key: string) => {
  const cookie = await db
    .select("key", "maxAge", "session")
    .from("sessions")
    .where("key", key)
    .first()

  if (!cookie) return undefined
  return cookie.session
}

export const deleteCookie = async (key: string) => {
  return db.from("sessions").where("key", key).del()
}

export const useSession = (app: Koa) =>
  session(
    {
      store: {
        get: getCookie,
        set: setCookie,
        destroy: deleteCookie,
      },
      key: SESSION_COOKIE,
      maxAge: 604800000, // a week
      httpOnly: true,
      signed: false,
      secure: false, //IS_PROD,
    },
    app,
  )

log.warn("Secure cookies is currently hardcoded to false. Fix this before production!")
