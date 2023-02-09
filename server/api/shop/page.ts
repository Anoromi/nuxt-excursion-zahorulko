import { FieldPath } from 'firebase-admin/firestore'
import { createBadData } from '~~/server/utils/badData'
import { databaseNames } from '~~/server/utils/database/names'
import { firestore } from '~~/server/utils/firebase'
import {
  applySearchQuery,
  validateQueryData,
} from '~~/server/utils/pageQuery'
import {
  ShortShopItemData,
  shortShopItemSelector,
} from '~~/server/utils/shopOptions'

export const shopPageLength = 10

export default defineEventHandler(async (event) => {
  const queryData = validateQueryData(getQuery(event))

  let query = firestore
    .collection(databaseNames.excursions)
    .limit(shopPageLength)
    .select(...shortShopItemSelector)

  query = applySearchQuery(query, queryData)

  if (queryData.startId !== undefined) {
    const startingObject = await firestore
      .collection(databaseNames.excursions)
      .where(
        FieldPath.documentId(),
        '==',
        queryData.startId,
      )
      .get()
    if (startingObject.empty) throw createBadData()
    query = query.startAfter(startingObject.docs[0])
  }

  const result = await query.get()


  return result.docs.map((v) => {
    return {
      id: v.id,
      ...v.data(),
    } as ShortShopItemData
  })
})
