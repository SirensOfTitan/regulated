import { AirtableBase } from "airtable/lib/airtable_base";
import { allRecordsForBase } from "./allRecordsForBase";
import * as schemas from "app/schemas";

export async function allStandards(client: AirtableBase) {
  const result = await allRecordsForBase(client, {
    baseName: "Other Standards",
    schema: schemas.standard(),
  });

  return new Map(result.map((result) => [result.id, result]));
}
