import { AirtableBase } from "airtable/lib/airtable_base";
import { allRecordsForBase } from "./allRecordsForBase";
import * as schemas from "app/schemas";

export async function allUsers(client: AirtableBase) {
  return await allRecordsForBase(client, {
    baseName: "Users",
    schema: schemas.user(),
  });
}
