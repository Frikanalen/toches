import Router from "@koa/router"
import { getXMLTVForComingWeek, getXMLTVForDay } from "./generateXMLTV"
import { getTVAnytimeForDay } from "./generateTVAnytime"

const router = new Router({
  prefix: "/epg",
})

router.get("/xmltv/:year/:month/:date", getXMLTVForDay)
router.get("/xmltv/upcoming", getXMLTVForComingWeek)

router.get("/tvAnytime/:year/:month/:date", getTVAnytimeForDay)

export { router as XMLTVRouter }
