export function mapValues<
  TIn extends Record<string, unknown>,
  TOut extends Record<keyof TIn, unknown>,
>(
  obj: TIn,
  mapper: (input: TIn[keyof TIn], key: keyof TIn) => TOut[keyof TIn],
): TOut {
  return Object.entries(obj)
    .map(
      ([key, value]) =>
        [key as keyof TIn, mapper(value as TIn[keyof TIn], key)] as const,
    )
    .reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {} as TOut);
}
