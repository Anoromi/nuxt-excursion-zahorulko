
export function enumToValues<T extends Record<string, string>>(
  obj: T,
 ) {
  return Object.keys(obj).filter(
    (v) => typeof Number(v) === 'number',
  ).map(v => obj[v] )
}
