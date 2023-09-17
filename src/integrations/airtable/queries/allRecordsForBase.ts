import { AirtableBase } from "airtable/lib/airtable_base";
import { ZodTypeAny, z } from "zod";

interface AllRecordsForBaseOptions<T> {
  baseName: string;
  schema: T;
}
export async function allRecordsForBase<T extends ZodTypeAny>(
  client: AirtableBase,
  { baseName, schema }: AllRecordsForBaseOptions<T>,
): Promise<z.infer<T>[]> {
  const results = await client(baseName).select().all();

  const mappedResults = results.map((x) => ({
    ID: x.id,
    ...x.fields,
  }));

  return schema.array().parse(mappedResults);
}
