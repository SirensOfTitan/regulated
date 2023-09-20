import { AirtableBase } from "airtable/lib/airtable_base";
import { ZodTypeAny, z } from "zod";
import { log } from "app/logger";

interface AllRecordsForBaseOptions<T> {
  baseName: string;
  schema: T;
}
export async function allRecordsForBase<T extends ZodTypeAny>(
  client: AirtableBase,
  { baseName, schema }: AllRecordsForBaseOptions<T>,
): Promise<z.infer<T>[]> {
  if (process.env.NODE_ENV === "production") {
    log.info("Calling allRecordsForBase", {
      baseName,
    });
  }

  const results = await client(baseName).select().all();

  const mappedResults = results.map((x) => ({
    ID: x.id,
    ...x.fields,
  }));

  return schema.array().parse(mappedResults);
}
