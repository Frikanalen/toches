import { mergePresentations } from "./mergePresentations"
import { ScheduleInterval } from "../epg/types"
import { presentJukeboxItems } from "./presentJukeboxItems"
import { presentLiveItems } from "./presentLiveItems"

// This (quite expensive!) function defines how the channel's schedule is presented to end users.
// TODO: It is probably a good idea to introduce cache here.
//  My suggestion for the solution here:
//    - We define a Schedule table, structured for use by user-facing services.
//      Similar in structure to the "PresentationEvent" type used here.
//      Think JSON columns with pre-cooked metadata objects for both REST and GraphQL.
//      The queries are already quite expensive and this will only get worse as we
//      begin to add complex logic for image selection and other metadata.
//      (and for all we know we might get some active users some day)
//    - We introduce a schedule damage table with either start and end times,
//      organization ID, video ID, or whatever identifies changes made in the database.
//      We a trigger to any relevant table update/insert/delete which logs cache damage,
//      and issues a NOTIFY. For proof of concept, we can start with a boolean dirty flag.
//    - We create a command-line entry point, LISTENing for the above NOTIFY.
//      If it is received (or if infrequent backup polling sees the dirty bit),
//      a schedule is derived from the myriad relevant database sources.
//    - The entry point runs as a separate deployment of the same Docker image
//      in Kubernetes, exposing metrics such as scheduling render time to Prometheus.
//    - The normal toches runtime can issue a very simple select to the Schedule table.
export const getSchedulePresentation = async ({ start, end }: ScheduleInterval) => {
  const jukeboxItems = await presentJukeboxItems({ start, end })
  const liveProgrammes = await presentLiveItems({ start, end })

  return mergePresentations(jukeboxItems, liveProgrammes)
}
