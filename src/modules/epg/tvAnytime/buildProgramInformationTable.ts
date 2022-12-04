import { PresentationEvent } from "../types"
import { Element } from "libxmljs2"

// Defined in TS 102 822-3-1 - 6.3.6:
// V1.8.1: https://tech.ebu.ch/docs/metadata/ts_1028220301v010801p.pdf
export const buildProgramInformationTable = (
  tvaProgramDescription: Element,
  scheduleEntries: PresentationEvent[],
) => {
  const tvaPIT = tvaProgramDescription.node("tva:ProgramInformationTable")
  const seenCRIDs: string[] = []

  scheduleEntries.forEach((item) => {
    if (item.crid in seenCRIDs) return

    seenCRIDs.push(item.crid)

    const tvaBasicDescription = tvaPIT
      .node("tva:ProgramInformation")
      .attr({
        programId: `${item.crid}`,
      })
      .node("tva:BasicDescription")

    tvaBasicDescription.node("tva:Title", item.title).attr({ type: "main" })
    tvaBasicDescription.node("tva:Synopsis", item.description)

    // CreditsList defined here: https://tech.ebu.ch/docs/metadata/ts_1028220301v010801p.pdf
    const tvaCreditsList = tvaBasicDescription.node("tva:CreditsList")
    const tvaCreditsItem = tvaCreditsList.node("tva:CreditsItem").attr({ role: "V20" })
    tvaCreditsItem.node("tva:OrganizationName", item.organizationName)
    tvaCreditsItem.node("tva:PresentationRole", "Produsert av").attr("xml:lang", "no")
  })
}
