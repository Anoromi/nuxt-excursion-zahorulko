export function* range(from: number, till: number) {
  for (let i = from; i < till; i++) {
    yield i
  }
}
