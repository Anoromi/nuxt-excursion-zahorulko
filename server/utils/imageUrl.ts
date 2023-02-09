export const imageUrl = (
  id: string,
  width: number,
  height: number,
) =>
  `https://loremflickr.com/${width}/${height}/city?lock=${id}`
