import { DeepPick } from 'ts-essentials'
import { z } from 'zod'
import { createBadData } from '~~/server/utils/badData'
import { databaseNames } from '~~/server/utils/database/names'
import { firestore } from '~~/server/utils/firebase'
import {
  ShopItemData,
  ShopItemSelector,
} from '~~/server/utils/shopOptions'

const galleryQueryData = z.object({
  number: z.coerce.number().int().nonnegative(),
})

export default defineEventHandler(async (event) => {
  const query = galleryQueryData.safeParse(getQuery(event))
  if (!query.success) throw createBadData()

  const result = await firestore
    .collection(databaseNames.excursions)
    .select(
      ...(['photo', 'title'] satisfies ShopItemSelector[]),
    )
    .limit(query.data.number)
    .get()

  return result.docs.map((v) => {
    return { id: v.id, ...v.data() } as DeepPick<
      ShopItemData,
      {
        title: true
        id: true
        photo: true
      }
    >
  })
})
