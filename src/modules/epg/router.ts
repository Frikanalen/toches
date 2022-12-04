import Router from "@koa/router"
import { getTVAnytimeForDay } from "./tvAnytime/generateTVAnytime"
import { getXMLTVHomePage } from "./xmltv/getXMLTVHomePage"
import { getXMLTVForDay } from "./xmltv/getXMLTVForDay"
import { getXMLTVForComingWeek } from "./xmltv/getXMLTVForComingWeek"

const router = new Router({
  prefix: "/epg",
})

router.get("/xmltv/:year/:month/:date", getXMLTVForDay)
router.get("/xmltv/upcoming", getXMLTVForComingWeek)
router.get("/xmltv", getXMLTVHomePage)

router.get("/tva/:year/:month/:date", getTVAnytimeForDay)

export { router as XMLTVRouter }
