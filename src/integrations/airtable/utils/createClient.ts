import Airtable from "airtable";
import { AirtableBase } from "airtable/lib/airtable_base";

export interface CreateClientInput {
  apiKey: string;
  base: string;
}

export function createClient({
  apiKey,
  base,
}: CreateClientInput): AirtableBase {
  return new Airtable({ apiKey }).base(base);
}
