import { Standard } from "app/schemas";
import { CacheType } from "../interface";
import * as airtable from "app/integrations/airtable";

const KEY = "ALL_STANDARDS" as const;

export const AllStandardsCacheType = CacheType<typeof KEY, Standard[]>({
  expiration: { type: "timeInSeconds", value: 3600 },
  keyPrefix: "standards",
  type: "fetchMany",
  async rawResults(ids) {
    const allStandards = await airtable.queries.allStandards(
      airtable.defaultClient,
    );

    return ids.map(() => allStandards);
  },
});
