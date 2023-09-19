export type Maybe<T> = T | null | undefined;
export type Tail<T> = T extends [unknown, ...infer R] ? R : never;
export type ReturnType<T> = T extends (...args: unknown[]) => infer R
  ? R
  : never;

/** These probably shouldn't live here, app-specific types */
export interface Product {
  id: string;
  name: string;
  url: Maybe<string>;
  slug: string;
}

export type ElementOf<T extends readonly unknown[]> = T[number];
