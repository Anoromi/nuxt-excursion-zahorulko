import { ensureVerifiedUser } from '~~/server/utils/authentication'
import { databaseNames } from '~~/server/utils/database/names'
import { firestore } from '~~/server/utils/firebase'
import { ensureStringRouteParam } from '~~/server/utils/helpers/stringRouteParam'

export default defineEventHandler(async (event) => {
  await ensureVerifiedUser(event)
  const eventId = ensureStringRouteParam(event, 'eventId')
  return await boughtTicketCount(eventId)
})

export async function boughtTicketCount(
  eventId: string,
): Promise<number> {
  return (
    await firestore
      .collection(databaseNames.userEvents)
      .where('eventId', '==', eventId)
      .select('ticketCount')
      .get()
  ).docs.reduce(
    (accum, next) => accum + next.data().ticketCount,
    0,
  )
}
