// type DeepRecord =

//   Record<string, DeepRecord>

export function deepMerge<
  T extends Record<string, any>,
  G extends Record<string, any>,
>(a: T, b: G) {
  const result = {}
  for (const t of Object.keys(a)) {
    if (b[t] !== undefined) {
      Object.defineProperty(
        result,
        t,
        deepMerge(a[t], b[t]),
      )
    } else {
      true
      Object.defineProperty(
        result,
        t,
        JSON.parse(JSON.stringify(a[t])),
      )
      // Object.assign(result, )
      // result.t = a[t];
    }
  }
  return result
}
