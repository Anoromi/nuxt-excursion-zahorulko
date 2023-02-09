import { z } from "zod"

export const userCalendarEvent = z.object({
  eventId: z.string(),
  ticketCount: z.number(),
  start: z.coerce.date(),
  end: z.coerce.date(),
  ticketLimit: z.number(),
  excursionId: z.string(),
  id: z.string(),
})

export type UserCalendarEvent = z.infer<
  typeof userCalendarEvent
>