import type { Maybe } from "app/types";

export interface CacheAdapter {
  getMany(...keys: string[]): Promise<Maybe<string>[]>;
  storeMany(toSet: Map<string, unknown>, expiresAfter?: number): Promise<void>;
  invalidate(...keys: string[]): Promise<void>;
}
