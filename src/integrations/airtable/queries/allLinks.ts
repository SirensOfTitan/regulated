import { AirtableBase } from "airtable/lib/airtable_base";
import { allRecordsForBase } from "./allRecordsForBase";
import * as schemas from "app/schemas";

export async function allLinks(client: AirtableBase) {
  const result = await allRecordsForBase(client, {
    baseName: "Links",
    schema: schemas.link(),
  });

  return new Map(result.map((result) => [result.id, result]));
}
