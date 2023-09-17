import { AirtableBase } from "airtable/lib/airtable_base";
import { allRecordsForBase } from "./allRecordsForBase";
import * as schemas from "app/schemas";

export async function allProducts(client: AirtableBase) {
  return await allRecordsForBase(client, {
    baseName: "Products",
    schema: schemas.product(),
  });
}
