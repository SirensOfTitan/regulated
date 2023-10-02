import { AirtableBase } from "airtable/lib/airtable_base";
import { allRecordsForBase } from "./allRecordsForBase";
import * as schemas from "app/schemas";

export async function allAccreditations(client: AirtableBase) {
  const [gov, industry] = await Promise.all([
    allRecordsForBase(client, {
      baseName: "Government Accreditations",
      schema: schemas
        .accreditation()
        .transform((t) => ({ ...t, kind: "gov" as const })),
    }),
    allRecordsForBase(client, {
      baseName: "Industry Accreditations",
      schema: schemas
        .accreditation()
        .transform((t) => ({ ...t, kind: "industry" as const })),
    }),
  ]);

  return [...gov, ...industry];
}
