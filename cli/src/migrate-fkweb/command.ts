import { Command } from "commander"
import { migrateUsers } from "./migrateUsers"
import { db } from "../db"
import { migrateOrganizations } from "./migrateOrganizations"
import { migrateVideos } from "./migrateVideos"
import { migrateVideoFiles } from "./migrateVideoFiles"
import { migrateSchedule } from "./migrateSchedule"

// NB!! THIS CODE IS INVOKED EVERY DAY THROUGH A CLUSTER CRONJOB.
export const migrateFkwebCommand = new Command("migrate-fkweb")
  .description("(DANGEROUS!) Fully migrate from legacy database")
  .action(async () => {
    await db("organizations").delete()
    await db("users").delete()
    await db("videos").delete()
    await db("video_media").delete()

    await migrateUsers()
    await migrateOrganizations()
    await migrateVideoFiles()
    await migrateVideos()
    await migrateSchedule()
  })

migrateFkwebCommand.addCommand(migrateFkwebCommand)
