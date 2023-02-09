import { z } from 'zod'
import { createBadData } from './badData'
import { oneOrMany } from './helpers/oneOrMany'
import { ShopItemSelector } from './shopOptions'

export const productTypes = [
  'thrilling',
  'relaxing',
  'extreme',
  'cultural',
]
export const productPromotions = ['Recommended', 'New']

export enum SortOptions {
  Price = 'price',
  Popularity = 'popularity',
}

export enum SortDirections {
  Ascending = 'asc',
  Descending = 'desc',
}

export const pageQueryData = z.object({
  name: z.string().optional(),
  sortBy: z.nativeEnum(SortOptions).optional(),
  direction: z.nativeEnum(SortDirections).optional(),
  promotion: oneOrMany(z.string()).optional(),
  type: z.string().optional(),
  startId: z.string().optional(),
})

export type PageQueryData = z.infer<typeof pageQueryData>

export function validateQueryData(
  query: any,
): PageQueryData {
  const parsedQuery = pageQueryData.safeParse(query)
  if (!parsedQuery.success) throw createBadData()
  return parsedQuery.data
}

export function applySearchQuery(
  query: FirebaseFirestore.Query,
  data: PageQueryData,
): FirebaseFirestore.Query {
  if (data.name !== undefined && data.name!.length > 0)
    query = query.where('title' satisfies ShopItemSelector, '==', data.name)
  else {
    if (data.type !== undefined)
      query = query.where('short.type', '==', data.type)
    if (data.promotion !== undefined)
      query = query.where(
        'promotion' satisfies ShopItemSelector,
        'array-contains-any',
        data.promotion,
      )
    if (data.sortBy === 'price')
      query = query.orderBy(
        'price.normal' satisfies ShopItemSelector,
        data.direction ?? 'desc',
      )
    else if (data.sortBy === 'popularity') {
      query = query.orderBy(
        'popularity' satisfies ShopItemSelector,
        data.direction ?? 'desc',
      )
    }
  }
  return query
}
