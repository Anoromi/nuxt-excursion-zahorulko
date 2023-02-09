<script setup lang="ts">
import { ShopItemSelector } from '~~/server/utils/shopOptions'
import { UserCalendarEvent } from '~~/server/utils/types/eventQuery'

const props = defineProps<{
  event: UserCalendarEvent
}>()

const { data: excursion, pending: loadingExcursion } =
  await useLazyFetch(
    `/api/shop/item/${props.event.excursionId}`,
    {
      query: {
        select: ['title'] satisfies ShopItemSelector[],
      },
    },
  )
</script>

<template>
  <section
    class="w-full rounded-lg bg-surface2-light py-3 px-2 dark:bg-surface2-dark"
  >
    <Placeholder
      v-if="loadingExcursion"
      class="w-48 text-lg"
    ></Placeholder>
    <h4 v-else>
      <NuxtLink
        :href="`/shop/item/${event.excursionId}`"
        class="highlight-none font-serif text-lg font-bold hover:text-primary-light hover:underline dark:hover:text-primary-dark"
      >
        {{ excursion!.title }}
      </NuxtLink>
    </h4>
    <ShopCalendarDateRange
      :start="event.start"
      :end="event.end"
      class="mt-1"
    />
    <div class="text-primary-light dark:text-primary-dark">
      {{ event.ticketCount }} tickets
    </div>
  </section>
</template>
