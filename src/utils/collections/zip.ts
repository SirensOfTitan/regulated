export function zip<T1, T2>(xs: T1[], ys: T2[]): [T1, T2][] {
  const minDim = Math.min(xs.length, ys.length);

  const zipped = [] as [T1, T2][];
  for (let i = 0; i < minDim; i += 1) {
    zipped.push([xs[i], ys[i]]);
  }

  return zipped;
}
