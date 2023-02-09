<script setup lang="ts">
import { Dayjs } from 'dayjs'
import { CalendarEvent } from '~~/utils/calendar'

withDefaults(
  defineProps<{
    day: Dayjs
    disabled?: boolean
    events: CalendarEvent[]
  }>(),
  { disabled: false },
)

defineEmits<{
  (
    event: 'clicked',
    day: Dayjs,
    calendarEvents: CalendarEvent[],
  ): void
}>()
</script>

<template>
  <td :class="`my-1  text-center`">
    <button
      v-if="!disabled && events.length > 0"
      type="button"
      class="highlight-none bg-secondary-container hover:bg-secondary h-full w-full rounded-xl py-1 font-bold transition-colors duration-300 ease-out"
      @click="$emit('clicked', day, events)"
    >
      {{ day.date() }}
    </button>
    <template v-else>
      <span
        :class="`
      ${
        disabled
          ? 'text-outline-light dark:text-outline-dark'
          : 'font-semibold text-primary-light dark:text-primary-dark'
      }`"
        >{{ day.date() }}</span
      >
    </template>
  </td>
</template>
