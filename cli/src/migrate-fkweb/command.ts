import { Command } from "commander"
import { migrateUsers } from "./migrateUsers"
import { db } from "../db"
import { migrateOrganizations } from "./migrateOrganizations"
import { migrateVideos } from "./migrateVideos"
import { migrateVideoFiles } from "./migrateVideoFiles"
import { migrateSchedule } from "./migrateSchedule"
import { log } from "./log"

// NB!! THIS CODE IS INVOKED EVERY DAY THROUGH A CLUSTER CRONJOB.
export const migrateFkwebCommand = new Command("migrate-fkweb")
  .description("(DANGEROUS!) Fully migrate from legacy database")
  .action(async () => {
    log.info("Frikanalen database migrate")
    log.warn("Deleting organizations")
    await db("organizations").delete()
    log.warn("Deleting users")
    await db("users").delete()
    log.warn("Deleting videos")
    await db("videos").delete()
    log.warn("Deleting video media")
    await db("video_media").delete()

    log.info("Migrating users")
    await migrateUsers()
    log.info("Migrating organizations")
    await migrateOrganizations()
    log.info("Migrating video files")
    await migrateVideoFiles()
    log.info("Migrating videos")
    await migrateVideos()
    log.info("Migrating schedule items")
    await migrateSchedule()

    log.info("Done!")
  })

migrateFkwebCommand.addCommand(migrateFkwebCommand)
