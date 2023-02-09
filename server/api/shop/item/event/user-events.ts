import {
  FieldPath,
  Transaction,
} from 'firebase-admin/firestore'
import { databaseNames } from '~~/server/utils/database/names'
import { firestore } from '~~/server/utils/firebase'
import { z } from 'zod'
import { ensureVerifiedUser } from '~~/server/utils/authentication'
import { UserCalendarEvent } from '~~/server/utils/types/eventQuery'
import { sleep } from '~~/server/utils/helpers/sleep'
import { timestampDate } from '~~/server/utils/helpers/firestoreZod'

export const userEventQueryData = z.object({
  start: z.coerce.date(),
  end: z.coerce.date(),
})

export type UserEventQuery = z.infer<
  typeof userEventQueryData
>

const validateQuery = async (
  query: any,
): Promise<UserEventQuery | 'bad/data'> => {
  const queryData = userEventQueryData.safeParse(query)
  if (!queryData.success) return 'bad/data'

  return queryData.data
}

export const firestoreEvent = z.object({
  start: timestampDate(),
  end: timestampDate(),
  ticketLimit: z.number(),
  excursionId: z.string(),
  id: z.string(),
})

export default defineEventHandler(async (event) => {
  const { uid: userId } = await ensureVerifiedUser(event)
  return firestore.runTransaction(async (transaction) => {
    const query = await validateQuery(getQuery(event))
    if (query === 'bad/data') {
      throw createError({
        statusMessage: query,
        statusCode: 400,
      })
    }

    await sleep(500)
    const userEvents = await getUserEvents(
      transaction,
      userId,
    )
    const excursionEvents: UserCalendarEvent[] =
      await findRespectiveEvents(
        userEvents,
        transaction,
        query,
      )
    return excursionEvents
  })
})

async function getUserEvents(
  transaction: Transaction,
  userId: string,
) {
  return await transaction
    .get(
      firestore
        .collection(databaseNames.userEvents)
        .where('userId', '==', userId)
        .select('eventId', 'ticketCount'),
    )
    .then((result) =>
      result.docs.map((doc) => {
        return {
          eventId: doc.data().eventId as string,
          ticketCount: doc.data().ticketCount as number,
        }
      }),
    )
}

async function findRespectiveEvents(
  userEvents: { eventId: string; ticketCount: number }[],
  transaction: Transaction,
  query: { start: Date; end: Date },
) {
  const eventData = await Promise.all(
    userEvents.map(
      async (userEvent) => {
        const eventSnapshot = await transaction
          .get(
            firestore
              .collection(databaseNames.events)
              .where(
                FieldPath.documentId(),
                '==',
                userEvent.eventId,
              ),
            //   .where('start', '>=', query.start)
            //   .where('start', '<=', query.end)
          )
          .then((result) => result.docs[0])
        const event = firestoreEvent.parse({
          ...eventSnapshot.data(),
          id: eventSnapshot.id,
        })

        if (
          event.start.getTime() >= query.start.getTime() &&
          event.start.getDate() <= query.end.getTime()
        )
          return { ...userEvent, ...event }
        return null
      },
    ),
  )

  return eventData.filter((v) => v !== null) as UserCalendarEvent[]
}
