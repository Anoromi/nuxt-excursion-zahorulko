<script setup lang="ts">
import { Dayjs } from 'dayjs'
import { FetchError } from 'ofetch';
import {
  UserCalendarEvent,
  userCalendarEvent,
} from '~~/server/utils/types/eventQuery'

useHead({
  title: 'My events',
  meta: [
    { name: 'description', content: 'View your events' },
  ],
})

definePageMeta({
  middleware: 'auth',
})

const cookie = useState(() => getRequestCookies())

const eventLoader = async (start: Dayjs, end: Dayjs) => {
  let headers: HeadersInit | undefined = undefined
  if (isOnServer()) headers = { cookie: cookie.value }
  const result = await $fetch(
    '/api/shop/item/event/user-events',
    {
      query: {
        start: start.toDate(),
        end: end.toDate(),
      },
      headers,
    },
  ).catch(async (v : FetchError) => {

    if (v.statusMessage === 'bad/key') {
      await navigateTo('/signin')
      return []
    } else throw v
  })
  return result.map((v) => userCalendarEvent.parse(v))
}
</script>

<template>
  <article>
    <Calendar
      :data-loader="eventLoader"
      v-slot="{ event, key }"
    >
      <MyEventsCard
        :key="key"
        :event="(event as UserCalendarEvent)"
      >
      </MyEventsCard>
    </Calendar>
  </article>
</template>
