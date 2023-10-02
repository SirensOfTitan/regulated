import { User } from "app/schemas";
import { CacheType } from "../interface";
import * as airtable from "app/integrations/airtable";

const KEY = "ALL_USERS" as const;

export const AllUsersCacheType = CacheType<typeof KEY, User[]>({
  expiration: { type: "timeInSeconds", value: 3600 },
  keyPrefix: "users",
  type: "fetchMany",
  async rawResults(ids) {
    const allUsers = await airtable.queries.allUsers(airtable.defaultClient);

    return ids.map(() => allUsers);
  },
});
