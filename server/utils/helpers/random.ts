

export function random(end : number) {
  return Math.floor(Math.random() * end)
}
export function randomRange(start : number, end : number) {
  return Math.floor(Math.random() * (end - start)) + start
}