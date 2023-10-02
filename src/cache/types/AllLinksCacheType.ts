import { Link } from "app/schemas";
import { CacheType } from "../interface";
import * as airtable from "app/integrations/airtable";

const KEY = "ALL_LINKS" as const;

export const AllLinksCacheType = CacheType<typeof KEY, Link[]>({
  expiration: { type: "timeInSeconds", value: 3600 },
  keyPrefix: "links",
  type: "fetchMany",
  async rawResults(ids) {
    const allLinks = await airtable.queries.allLinks(airtable.defaultClient);

    return ids.map(() => allLinks);
  },
});
