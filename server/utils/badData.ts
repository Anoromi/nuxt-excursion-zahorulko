
export function createBadData() {
  return createError({
    statusCode: 400,
    statusMessage: 'bad/data'
  })
}