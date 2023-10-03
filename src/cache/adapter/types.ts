import type { Maybe } from "app/types";

export interface CacheAdapter {
  getMany(...keys: string[]): Promise<Maybe<unknown>[]>;
  storeMany(toSet: Map<string, unknown>, expiresAfter?: number): Promise<void>;
  invalidate(...keys: string[]): Promise<void>;
}
