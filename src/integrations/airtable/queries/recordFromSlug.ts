import { AirtableBase } from "airtable/lib/airtable_base";
import * as schemas from "app/schemas";

interface RecordFromSlugInput {
  tableName: string;
  slug: string;
}

// Precondition: Slug should be sanitized.
export async function recordFromSlug(
  client: AirtableBase,
  { slug, tableName }: RecordFromSlugInput,
) {
  const results = await client(tableName)
    .select({
      filterByFormula: `{Slug} = '${slug}'`,
      pageSize: 1,
    })
    .firstPage();

  const record = results.length > 0 ? results[0] : null;
  if (record == null) {
    return null;
  }

  return schemas.product().parse({
    ...record.fields,
    ID: record.id,
  });
}
