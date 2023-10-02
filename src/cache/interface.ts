import dataloader from "dataloader";
import stableStringify from "json-stable-stringify";

import type { Maybe } from "app/types";
import * as collections from "app/utils/collections";
import { CompoundCacheAdapter } from "./adapter/CompoundCacheAdapter";

type ICacheTypeExpiration =
  | { type: "timeInSeconds"; value: number }
  | { type: "neverExpire" };

export type CacheKey = string | number;

type Stringable = { toString(): string } | { [key: string]: CacheKey };

export interface CacheTypeShape<TKey extends Stringable, TResult> {
  // When a cache item should expire
  expiration: ICacheTypeExpiration;
  // The cache key for a particular item.
  cacheKey(id: TKey): string;
  // Retrieves an item from cache or if a miss occurs from
  // the underlying source.
  fetch(id: TKey): Promise<Maybe<TResult>>;
  fetchMany(ids: TKey[]): Promise<Maybe<TResult>[]> | Maybe<TResult>[];
  // Removes an item from cache, if it exists
  invalidate(...ids: TKey[]): Promise<void>;
  // Manually stores an item inside the cache, useful if the cache
  // has no backing.
  store(id: TKey, value: TResult): Promise<void>;
  // Stores any result that is not null.
  storeMany(idsWithValues: Map<TKey, Maybe<TResult>>): Promise<void>;
}

type SourceType<TKey, TResult> =
  // The item is set manually inside the cache
  | { type: "noSource" }
  // The item is fetched from a batch source.
  | {
      type: "fetchMany";
      rawResults(ids: TKey[]): Promise<Maybe<TResult>[]> | Maybe<TResult>[];
    };

function getStringKey(from: Stringable): string {
  if (typeof from === "string") {
    return from;
  } else if (typeof from === "number") {
    return `${from}`;
  }
  return stableStringify(from);
}

type CacheConfigInput<TKey, TResult> = {
  expiration: ICacheTypeExpiration;
  // A value that, when prefixed to the cache `id`, is unique globally.
  keyPrefix: string;
} & SourceType<TKey, TResult>;

const cacheAdapter = new CompoundCacheAdapter();
export const CacheType = <TKey extends Stringable, TResult>(
  input: CacheConfigInput<TKey, TResult>,
): CacheTypeShape<TKey, TResult> => {
  const cacheKey = (id: TKey) => {
    const idKey = getStringKey(id);
    return [input.keyPrefix, idKey].join(":");
  };

  async function storeMany(idsWithValues: Map<TKey, Maybe<TResult>>) {
    await cacheAdapter.storeMany(
      new Map(
        Array.from(idsWithValues.entries())
          .filter(([, value]) => value != null)
          .map(
            ([key, value]) => [cacheKey(key), JSON.stringify(value)] as const,
          ),
      ),
      input.expiration.type === "timeInSeconds"
        ? input.expiration.value
        : undefined,
    );
  }

  const dataLoader = new dataloader<TKey, Maybe<TResult>>(
    async (keys) => {
      const mappedKeys = keys.map((k) => cacheKey(k));
      const cacheValues = await cacheAdapter.getMany(...mappedKeys);
      const cacheResults = collections
        .zip(keys as TKey[], cacheValues)
        .map(
          ([key, value]) =>
            [
              key,
              value != null ? (JSON.parse(value) as TResult) : null,
            ] as const,
        );

      switch (input.type) {
        case "noSource":
          return cacheResults.map(([, value]) => value);
        case "fetchMany":
          const groupedByHits = collections.groupBy(
            cacheResults,
            ([, value]) => (value == null ? "miss" : "hit"),
          );

          const misses = groupedByHits.get("miss");
          const missedKeys = misses == null ? [] : misses.map(([key]) => key);

          let missedByKey = new Map<TKey, Maybe<TResult>>();

          if (missedKeys.length !== 0) {
            const missedValues = await input.rawResults(missedKeys);
            missedByKey = new Map(collections.zip(missedKeys, missedValues));
            await storeMany(missedByKey);
          }

          const hits = groupedByHits.get("hit");
          const filledMap = missedByKey;
          hits?.forEach(([key, value]) => filledMap.set(key, value));
          return keys.map((key) => filledMap.get(key));
      }
    },
    { cache: false, batch: true },
  );

  return {
    cacheKey,
    storeMany,
    expiration: input.expiration,

    async fetchMany(ids: TKey[]): Promise<Maybe<TResult>[]> {
      const result = await dataLoader.loadMany(ids);
      return result.filter(collections.isNotError);
    },

    async fetch(id: TKey): Promise<Maybe<TResult>> {
      return dataLoader.load(id);
    },

    async invalidate(...ids: TKey[]): Promise<void> {
      await cacheAdapter.invalidate(...ids.map((id) => cacheKey(id)));
    },

    async store(id: TKey, value: TResult): Promise<void> {
      const map = new Map<TKey, Maybe<TResult>>();
      map.set(id, value);
      return this.storeMany(map);
    },
  };
};
