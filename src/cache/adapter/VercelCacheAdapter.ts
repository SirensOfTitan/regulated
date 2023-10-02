import { Maybe } from "app/types";
import * as types from "./types";
import * as collections from "app/utils/collections";
import { kv } from "@vercel/kv";

export class VercelCacheAdapter implements types.CacheAdapter {
  async getMany(...keys: string[]): Promise<Maybe<string>[]> {
    const hits = await Promise.all(
      keys.map(async (key) => {
        const value = await kv.get<string>(key);
        if (value == null) {
          return null;
        }

        return [key, value] as const;
      }),
    );

    const hitsByKey = new Map(hits.filter(collections.isNotNull));
    return keys.map((key) => hitsByKey.get(key));
  }

  async storeMany(toSet: Map<string, string>, expiresAfter?: number) {
    const multi = kv.pipeline();

    Array.from(toSet.entries()).forEach(([key, value]) => {
      if (value == null) {
        return;
      }

      multi.set(key, value);
      if (expiresAfter != null) {
        multi.expire(key, expiresAfter);
      }
    });

    await multi.exec();
  }

  async invalidate(...keys: string[]) {
    if (keys.length === 0) {
      return;
    }

    await kv.del(...keys);
  }
}
