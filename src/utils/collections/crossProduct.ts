export function crossProduct<T1, T2>(
  xs: readonly T1[],
  ys: readonly T2[],
): (readonly [T1, T2])[] {
  const result = [];
  for (const x of xs) {
    for (const y of ys) {
      result.push([x, y] as const);
    }
  }

  return result;
}
