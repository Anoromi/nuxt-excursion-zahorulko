export function toArray<T>(value: T | T[]) {
  if (value instanceof Array<T>) return value
  else return [value]
}
