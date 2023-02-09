export function skip<T>(
  iter: Iterator<T>,
  count: number,
): Iterator<T> {
  while (count > 0) {
    const iterResult = iter.next()
    if (iterResult.done) break
    count -= 1
  }
  return iter
}

export function take<T>(
  iter: Iterator<T>,
  size: number,
): T[] {
  const array = Array<T>()
  while (size > 0) {
    const iterResult = iter.next()
    if (iterResult.done) break
    array.push(iterResult.value)
    size -= 1
  }
  return array
}
