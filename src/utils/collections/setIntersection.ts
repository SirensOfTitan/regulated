export function setIntersection<T>(...xs: Iterable<T>[]): Set<T> {
  if (xs.length < 2) {
    return new Set(xs[0] ?? []);
  }

  const [first, ...others] = xs;
  const othersAsSet = others.map((ys) => new Set(ys));

  return new Set([...first].filter((x) => othersAsSet.every((y) => y.has(x))));
}
