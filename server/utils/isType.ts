function are(
  predicate: (value: any) => boolean,
  ...objects: any[]
): boolean {
  for (let i = 0; i < objects.length; i++) {
    if (!predicate(objects[i])) return false
  }
  return true
}

export const areStringsOrUndef = (...objects: any[]) =>
  are(
    (v) => typeof v === 'string' || v === undefined,
    ...objects,
  )

export const areStrings = (...objects: any[]) =>
  are((v) => typeof v === 'string', ...objects)
export const areArraysOrUndef = (...objects: any[]) =>
  are(
    (v) => v instanceof Array || v === undefined,
    ...objects,
  )
