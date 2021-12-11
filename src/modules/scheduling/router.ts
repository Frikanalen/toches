import Router from "@koa/router"

const router = new Router({
  prefix: "schedule-entries",
})

// Temporary mock route to get frontend working
router.get("/", (context, next) => {
  context.body = {
    rows: [],
    count: 0,
    offset: 0,
    limit: 5,
  }

  return next()
})

export { router as scheduleRouter }
