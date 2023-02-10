<script setup lang="ts">
import { Dayjs } from 'dayjs'
import { FetchError } from 'ofetch'
import { ExcursionCalendarEvent } from '~~/server/utils/dataGenerators/createCalendarEvents'
import { areStrings } from '~~/server/utils/isType'
import { ShopItemSelector } from '~~/server/utils/shopOptions'
import { CalendarEvent } from '~~/utils/calendar'

definePageMeta({
  middleware: [
    'auth',
    async (route) => {
      return areStrings(route.params['id'])
    },
  ],
})

const router = useRoute()
const itemId = router.params['id'] as string

const itemData = await $fetch(`/api/shop/item/${itemId}`, {
  query: { select: ['title', 'description.short'] as ShopItemSelector[] },
})

useHead({
  title: `${itemData.title} events`,
  meta: [
    {
      name: 'description',
      content: itemData.description!.short,
    },
  ],
})

const calendarLoader = async (start: Dayjs, end: Dayjs) => {
  const result = await $fetch('/api/shop/item/event/all', {
    query: {
      id: itemId,
      start: start.toISOString(),
      end: end.toISOString(),
    },
  }).catch(async (v: FetchError) => {
    if (v.statusMessage === 'bad/key') {
      await navigateTo('/signin')
      return []
    } else throw v
  })
  return result.map((v) => ({
    ...v,
    start: new Date(v.start),
    end: new Date(v.end),
  })) satisfies CalendarEvent[]
}
</script>

<template>
  <article class="w-full">
    <TextTitle class="pt-5 pb-3 px-2 sm:px-9 bg-surface5-light dark:bg-surface5-dark">
      Browse events
    </TextTitle>
  <Calendar
    :data-loader="calendarLoader"
    v-slot="{ key, event }"
  >
    <ShopCalendarEventCard
      :key="key"
      :event="(event as ExcursionCalendarEvent)"
    >
    </ShopCalendarEventCard>
  </Calendar>
  </article>
</template>
