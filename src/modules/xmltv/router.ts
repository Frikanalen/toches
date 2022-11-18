import Router from "@koa/router"
import { getXMLTVForComingWeek, getXMLTVForDay } from "./generateXMLTV"

const router = new Router({
  prefix: "/epg",
})

router.get("/xmltv/:year/:month/:date", getXMLTVForDay)
router.get("/xmltv/upcoming", getXMLTVForComingWeek)

export { router as XMLTVRouter }
