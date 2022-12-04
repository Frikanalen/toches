import { areIntervalsOverlapping, compareAsc } from "date-fns"
import { PresentationEvent } from "../epg/types"

// Merge two lists of ScheduleEntries. If items conflict by overlapping in time,
// items in the highPriority list pre-empt those in the lowPriority list.
// TODO: Some test coverage here would be real nice.
export const mergePresentations = (
  lowPriority: PresentationEvent[],
  highPriority: PresentationEvent[],
) => {
  // Remove items from lower-priority schedule
  const lowPriorityPruned = lowPriority.filter(
    (lowerPrioritizedItem) =>
      !highPriority.find((higherPrioritizedItem) =>
        areIntervalsOverlapping(higherPrioritizedItem, lowerPrioritizedItem),
      ),
  )

  // Sort after merge
  return [...lowPriorityPruned, ...highPriority].sort((a, b) =>
    compareAsc(a.start, b.start),
  )
}
