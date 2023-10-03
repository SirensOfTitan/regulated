import { LocalCacheAdapter } from "./LocalCacheAdapter";
import { VercelCacheAdapter } from "./VercelCacheAdapter";
import * as types from "./types";

import type { Maybe } from "app/types";

export class CompoundCacheAdapter implements types.CacheAdapter {
  adapter: types.CacheAdapter;

  constructor() {
    console.log(process.env);
    this.adapter =
      process.env.NODE_ENV === "production" &&
      process.env.NEXT_PHASE !== "phase-production-build"
        ? new VercelCacheAdapter()
        : new LocalCacheAdapter();
  }

  async getMany(...keys: string[]): Promise<Maybe<unknown>[]> {
    return this.adapter.getMany(...keys);
  }

  async storeMany(toSet: Map<string, string>, expiresAfter?: number) {
    return this.adapter.storeMany(toSet, expiresAfter);
  }

  async invalidate(...keys: string[]) {
    return this.adapter.invalidate(...keys);
  }
}
