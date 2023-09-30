export type Maybe<T> = T | null | undefined;
export type Tail<T> = T extends [unknown, ...infer R] ? R : never;
export type ReturnType<T> = T extends (...args: unknown[]) => infer R
  ? R
  : never;

export type ElementOf<T extends readonly unknown[]> = T[number];

export type PromiseOrValue<T> = T | Promise<T>;
