import { FieldPath } from 'firebase-admin/firestore'
import { z } from 'zod'
import { ensureVerifiedUser } from '~~/server/utils/authentication'
import { createBadData } from '~~/server/utils/badData'
import { databaseNames } from '~~/server/utils/database/names'
import { firestore } from '~~/server/utils/firebase'
import { sleep } from '~~/server/utils/helpers/sleep'
import { ensureStringRouteParam } from '~~/server/utils/helpers/stringRouteParam'
import { boughtTicketCount } from '../count/[eventId]'
import { firestoreEvent } from '../user-events'

const reserveHeaderData = z
  .object({
    ticket_count: z.coerce.number().int().positive(),
  })
  .passthrough()

export default defineEventHandler(async (event) => {
  await sleep(1000)
  const { uid: userId } = await ensureVerifiedUser(event)
  const eventId = ensureStringRouteParam(event, 'eventId')
  const queryData = reserveHeaderData.safeParse(
    getHeaders(event),
  )
  if (!queryData.success) throw createBadData()

  const [boughtTickets, excursionEvent] = await Promise.all(
    [boughtTicketCount(eventId), getEvent(eventId)],
  )

  if (excursionEvent === null) throw createBadData()

  if (
    boughtTickets + queryData.data.ticket_count >
    excursionEvent.ticketLimit
  )
    throw createError({
      statusCode: 400,
      statusMessage: 'bad/ticketCount',
    })

  await firestore.collection(databaseNames.userEvents).add({
    userId,
    eventId,
    ticketCount: queryData.data.ticket_count,
  })
  event.node.res.statusCode = 202
  event.node.res.end()
})

export async function getEvent(eventId: string) {
  const document = (
    await firestore
      .collection(databaseNames.events)
      .where(FieldPath.documentId(), '==', eventId)
      .get()
  ).docs[0]
  return document === undefined
    ? null
    : firestoreEvent.parse({
        ...document.data(),
        id: document.id,
      })
}
