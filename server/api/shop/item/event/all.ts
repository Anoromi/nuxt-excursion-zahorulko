import {
  FieldPath,
  Timestamp,
  Transaction,
} from 'firebase-admin/firestore'
import { z } from 'zod'
import { databaseNames } from '~~/server/utils/database/names'
import { ExcursionCalendarEvent } from '~~/server/utils/dataGenerators/createCalendarEvents'
import { firestore } from '~~/server/utils/firebase'
import { sleep } from '~~/server/utils/helpers/sleep'
import { firestoreEvent } from './user-events'

const excursionEventQueryData = z.object({
  start: z.coerce.date(),
  end: z.coerce.date(),
  id: z.string(),
})
export type ExcursionEventQuery = z.infer<
  typeof excursionEventQueryData
>
const validateQuery = async (
  query: any,
  transaction: Transaction,
): Promise<
  ExcursionEventQuery | 'bad/data' | 'bad/key'
> => {
  const queryData = excursionEventQueryData.safeParse(query)
  if (!queryData.success) return 'bad/data'
  const idCheck = await transaction.get(
    firestore
      .collection(databaseNames.excursions)
      .where(
        FieldPath.documentId(),
        '==',
        queryData.data.id,
      )
      .count(),
  )
  if (idCheck.data().count === 0) return 'bad/key'
  return queryData.data
}

export default defineEventHandler(
  async (event): Promise<ExcursionCalendarEvent[]> => {
    return firestore.runTransaction(async (transaction) => {
      const query = await validateQuery(
        getQuery(event),
        transaction,
      )
      if (query === 'bad/data' || query === 'bad/key') {
        throw createError({
          statusMessage: query,
          statusCode: 400,
        })
      }

      const result = await firestore
        .collection(databaseNames.events)
        .where('excursionId', '==', query.id)
        .where(
          'start',
          '>=',
          Timestamp.fromDate(query.start),
        )
        .where('start', '<=', Timestamp.fromDate(query.end))
        .get()

      await sleep(400)
      return result.docs.map((doc) => {
        return firestoreEvent.parse({
          ...doc.data(),
          id: doc.id,
        })
      })
    })
  },
)
