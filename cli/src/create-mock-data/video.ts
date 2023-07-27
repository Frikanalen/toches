import { faker } from "@faker-js/faker"
import { sub } from "date-fns"
import { Command } from "commander"
import { db } from "../db"
import { getRandomItem } from "../helpers/getRandomItem"
import { exec } from "child_process"
import { promisify } from "util"

const execAsync = promisify(exec)

export const videoCommand = new Command("videos")
  .description("Add randomly generated videos to the database")
  .option("-o, --organization", "Specify organization id", (x) => parseInt(x) || 1)
  .option("-m, --manualSchedulingOnly", "If the videos should be jukeboxable")
  .argument(
    "[amount]",
    "The amount of videos to generate, defaults to one",
    (x) => parseInt(x) || 1,
    1,
  )
  .action(async (amount: number) => {
    const { organization, manualSchedulingOnly } = videoCommand.opts()
    const ids = await db.select("id").from("organizations").pluck<number[]>("id")

    if (!ids.length) {
      console.error("Videos need organizations in db (try cmd organizations 10)")
      return
    }

    const now = new Date()

    const stagedVideos = Array(amount)
      .fill(undefined)
      .map(() => ({
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        organization_id: organization ?? getRandomItem(ids),
        created_at: sub(now, { hours: Math.floor(Math.random() * 8760) }),
        jukeboxable: !manualSchedulingOnly,
      }))

    for (const video of stagedVideos) {
      console.info(`Generating "${video.title}"`)
      await execAsync(`fk media generate -o /tmp/file.mp4 -s 5 -t "${video.title}"`)

      const { stdout: mediaId } = await execAsync(`fk media upload -f /tmp/file.mp4`)

      const [{ id }] = await db
        .insert({ ...video, media_id: parseInt(mediaId.trim()) })
        .into("videos")
        .returning("id")

      console.info(`Created with ID "${id}"`)
    }

    console.info(`Generated ${amount} video(s).`)
  })
