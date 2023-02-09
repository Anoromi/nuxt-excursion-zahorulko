import { FieldPath } from 'firebase-admin/firestore'
import { z } from 'zod'
import { createBadData } from '~~/server/utils/badData'
import { databaseNames } from '~~/server/utils/database/names'
import { firestore } from '~~/server/utils/firebase'
import { oneOrMany } from '~~/server/utils/helpers/oneOrMany'
import {
  ShopItemData,
} from '~~/server/utils/shopOptions'
import {DeepPartial} from 'ts-essentials'
import { ensureStringRouteParam } from '~~/server/utils/helpers/stringRouteParam'


const excursionQueryData = z.object({
  select : oneOrMany(z.string())
})

export default defineEventHandler(async (event) => {
  const id = ensureStringRouteParam(event, 'id')
  const queryData = excursionQueryData.safeParse(
    getQuery(event),
  )

  if (!queryData.success)
    throw createBadData()

  let query = firestore
    .collection(databaseNames.excursions)
    .where(FieldPath.documentId(), '==', id)
  query = query.select(...queryData.data.select)
  const result = await query.get()

  if (result.empty) {
    throw createError({
      statusCode: 400,
      statusMessage: 'bad/id',
    })
  }

  return <
    DeepPartial<ShopItemData>
  >{
    ...result.docs[0].data(),
    id: result.docs[0].id,
  }
})
