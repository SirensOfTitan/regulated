import { Product } from "app/schemas";
import { CacheType } from "../interface";
import * as airtable from "app/integrations/airtable";

const KEY = "ALL_PRODUCTS" as const;

export const AllProductsCacheType = CacheType<typeof KEY, Product[]>({
  expiration: { type: "timeInSeconds", value: 3600 },
  keyPrefix: "products",
  type: "fetchMany",
  async rawResults(ids) {
    // Dedupe keys, then double check we're only fetching the singular-key type:
    const allProducts = await airtable.queries.allProducts(
      airtable.defaultClient,
    );

    return ids.map(() => allProducts);
  },
});
