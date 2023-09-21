import { AirtableBase } from "airtable/lib/airtable_base";
import { allRecordsForBase } from "./allRecordsForBase";
import * as schemas from "app/schemas";

export async function allUsers(client: AirtableBase) {
  const result = await allRecordsForBase(client, {
    baseName: "Users",
    schema: schemas.user(),
  });

  return new Map(result.map((user) => [user.id, user]));
}
