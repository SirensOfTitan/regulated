import { Maybe } from "app/types";
import * as types from "./types";
import * as collections from "app/utils/collections";

interface Value {
  expiration: number;
  value: unknown;
}

export class LocalCacheAdapter implements types.CacheAdapter {
  #map: Map<string, Value>;
  constructor() {
    this.#map = new Map();
  }

  async getMany(...keys: string[]): Promise<Maybe<unknown>[]> {
    const now = new Date().getTime() / 1000;
    const grouped = collections.groupBy(
      keys
        .filter((k) => this.#map.has(k))
        .map((k) => [k, this.#map.get(k) as Value] as const),
      ([, v]) => (v.expiration > now ? "hit" : "miss"),
    );

    // Invalidate misses in the get call.
    const misses = grouped.get("miss") ?? [];
    for (const [k] of misses) {
      this.#map.delete(k);
    }

    const hits = new Map(grouped.get("hit") ?? []);
    return keys.map((k) => {
      const hit = hits.get(k)?.value;
      return hit != null ? hit : null;
    });
  }

  async storeMany(toSet: Map<string, unknown>, expiresAfterImpl?: number) {
    const now = new Date().getTime() / 1000;
    const expiration = expiresAfterImpl
      ? now + expiresAfterImpl
      : Number.MAX_SAFE_INTEGER;

    Array.from(toSet.entries()).forEach(([key, value]) => {
      this.#map.set(key, {
        value,
        expiration,
      });
    });
  }

  async invalidate(...keys: string[]) {
    keys.forEach((key) => {
      this.#map.delete(key);
    });
  }
}
