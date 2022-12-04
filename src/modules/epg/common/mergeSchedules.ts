import { areIntervalsOverlapping, compareAsc } from "date-fns"
import { ScheduleEntry } from "../types"

// TODO: Some test coverage here would be real nice
export const mergeSchedules = (
  lowPriority: ScheduleEntry[],
  highPriority: ScheduleEntry[],
) => {
  // If a jukebox item overlaps with a live transmission, we delete the jukebox item
  const lowPriorityPruned = lowPriority.filter((lowPri) => {
    return !highPriority.find((highPri) => areIntervalsOverlapping(highPri, lowPri))
  })

  // Sort after merge
  return [...lowPriorityPruned, ...highPriority].sort((a, b) =>
    compareAsc(a.start, b.start),
  )
}
