import { faker } from '@faker-js/faker'
import { FieldPath } from 'firebase-admin/firestore'
import { databaseNames } from '../database/names'
import { firestore } from '../firebase'
import { randomRange } from '../helpers/random'
import { range } from '../helpers/range'

export type ExcursionCalendarEvent = {
  id: string
  start: Date
  end: Date
  ticketLimit: number
  excursionId: string
}


export async function createCalendarEvents() {
  const items = await firestore
    .collection(databaseNames.excursions)

    .select(FieldPath.documentId())
    .get()
  items.forEach(async ({ id: excursionId }) => {
    await Promise.all(
      Array.from(range(0, 10)).map(async () => {
        const eventStart = faker.date.soon(90)
        const event: Omit<ExcursionCalendarEvent, 'id'> = {
          start: eventStart,
          end: faker.date.soon(1, eventStart),
          ticketLimit: randomRange(1, 5),
          excursionId,
        }
        await firestore
          .collection(databaseNames.events)
          .add(event)
      }),
    )
  })
}
