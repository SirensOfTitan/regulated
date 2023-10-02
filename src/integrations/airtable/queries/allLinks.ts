import { AirtableBase } from "airtable/lib/airtable_base";
import { allRecordsForBase } from "./allRecordsForBase";
import * as schemas from "app/schemas";

export async function allLinks(client: AirtableBase) {
  return await allRecordsForBase(client, {
    baseName: "Links",
    schema: schemas.link(),
  });
}
