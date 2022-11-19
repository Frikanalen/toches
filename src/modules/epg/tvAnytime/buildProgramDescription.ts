import { Document } from "libxmljs2"
import { formatISO } from "date-fns"

// Defined in TS 102 822-3-1
// v1.8.1:  https://tech.ebu.ch/docs/metadata/ts_1028220301v010801p.pdf
export const buildProgramDescription = () => {
  const doc = new Document()
  return doc
    .node("tva:TVAMain")
    .attr({
      xmlns: "urn:tva:metadata:2019",
      "xmlns:tva": "urn:tva:metadata:2019",
      "xmlns:mpeg7": "urn:tva:mpeg7:2008",
      "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
      type: "epg",
      "xml:lang": "no",
      publisher: "Foreningen Frikanalen, tekn. ansvarlig Tore Sinding Bekkedal",
      publicationTime: formatISO(new Date()),
      rightsOwner: "frikanalen.no",
      originID: "frikanalen.no",
      "xsi:schemaLocation":
        "urn:tva:metadata:2019 http://www.nrk.no/tvanytime/xml/tva_metadata_3-1.xsd",
    })
    .node("tva:ProgramDescription")
}
