import { Accreditation } from "app/schemas";
import { CacheType } from "../interface";
import * as airtable from "app/integrations/airtable";

const KEY = "ALL_ACCREDITATIONS" as const;

export const AllAccreditationsCacheType = CacheType<
  typeof KEY,
  Accreditation[]
>({
  expiration: { type: "timeInSeconds", value: 3600 },
  keyPrefix: "accreditations",
  type: "fetchMany",
  async rawResults(ids) {
    const allAccreditations = await airtable.queries.allAccreditations(
      airtable.defaultClient,
    );

    return ids.map(() => allAccreditations);
  },
});
