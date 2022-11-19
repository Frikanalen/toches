import { Element } from "libxmljs2"

// Defined in TS 102 822-3-1 - 6.4.3:
// v1.8.1:  https://tech.ebu.ch/docs/metadata/ts_1028220301v010801p.pdf
export const buildServiceInformationTable = (tvaProgramDescription: Element) => {
  const tvaServiceInformationTable = tvaProgramDescription.node(
    "tva:ServiceInformationTable",
  )

  const tvaSI = tvaServiceInformationTable.node("tva:ServiceInformation").attr({
    serviceId: "frikanalen.no",
  })
  tvaSI.node("tva:Name", "Frikanalen")
  tvaSI.node("tva:Owner", "Foreningen Frikanalen")
  tvaSI.node("tva:ServiceUrl", "https://frikanalen.no/").attr({
    name: "WWW",
  })
  tvaSI.node("tva:ServiceType").attr({
    href: "urn:nordig:metadata:cs:ServiceTypeCS:2019:linear",
  })
  tvaSI.node("tva:ServiceType").attr({
    href: "urn:nordig:metadata:cs:ServiceTypeCS:2019:video",
  })
  tvaSI.node("tva:ServiceLanguage", "no")
}
