export function groupBy<T>(
  collection: Iterable<T>,
  groupFn: (val: T) => string,
): Map<string, T[]> {
  const grouped = new Map<string, T[]>();
  [...collection].forEach((val) => {
    const key = groupFn(val);
    const group = grouped.get(key) ?? [];
    grouped.set(key, group.concat([val]));
  });
  return grouped;
}
