<script setup lang="tsx">
import dayjs, { Dayjs } from 'dayjs'
import { range } from '~~/server/utils/helpers/range'
import { CalendarEvent } from '~~/utils/calendar'

const props = defineProps<{
  dataLoader: (
    start: Dayjs,
    end: Dayjs,
  ) => Promise<CalendarEvent[]> | CalendarEvent[]
}>()

const date = ref(
  dayjs(Date.now())
    .startOf('month')
    .startOf('day')
    .toDate(),
)
const dateDayjs = computed(() => dayjs(date.value))
const formattedDate = computed(() => {
  return dayjs(date.value).format('MM/YYYY')
})

const {
  data: events,
  pending: loadingData,
} = await useAsyncData(
  async () => {
    const result = await props.dataLoader(
      dateDayjs.value,
      dateDayjs.value.endOf('month'),
    )
    return result
  },
  {
    watch: [date],
    lazy: true,

    transform: (values) => {
      return values.sort(
        (a, b) => a.start.getTime() - b.start.getTime(),
      )
    },
  },
)

function groupEvents(
  events: CalendarEvent[],
  start: Dayjs,
) {
  let i = 0
  let currentDay = start
  let currentDayEnd = start.endOf('day')
  const dayEvents: CalendarEvent[][] = []
  while (i < events.length) {
    const iDate = dayjs(events[i].start)
    if (iDate.isBefore(currentDay)) {
      i++
    } else if (
      currentDayEnd.isAfter(iDate)
    ) {
      let j = i + 1
      while (j < events.length) {
        const jDate = dayjs(events[j].start)
        if (
          currentDayEnd.isAfter(jDate)
        ) {
          j++
        } else break
      }
      dayEvents.push(events.slice(i, j))
      i = j
      currentDay = currentDay.add(1, 'day')
      currentDayEnd = currentDay.endOf('day')
    } else {
      currentDay = currentDay.add(1, 'day')
      currentDayEnd = currentDay.endOf('day')
      dayEvents.push([])
    }
  }

  return dayEvents
}

const daysOfWeek = ((): [string, string][] =>
  [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ].map((v) => [v.slice(0, 2), v]))()

const offset = computed(() =>
  dateDayjs.value.startOf('month').day(),
)
const days = computed(() => {
  const dateValue = dateDayjs.value
  const eventsValue = events.value
  const offsetValue = offset.value
  const groupedEvents = groupEvents(eventsValue!, dateValue)
  return Array.from(range(0, 42)).map((point) => {
    const day = dateValue.add(point - offsetValue, 'days')
    const inactive = day.month() !== dateValue.month()
    let dayEvents = [] as CalendarEvent[]
    if (
      point - offsetValue > 0 &&
      point - offsetValue < groupedEvents.length
    ) {
      dayEvents = groupedEvents[point - offsetValue]
    }
    return {
      day,
      disabled: inactive,
      values: dayEvents,
    }
  })
})

const selectedDay = ref(
  null as {
    day: Dayjs
    events: CalendarEvent[]
  } | null,
)
</script>

<template>
  <table
    class="w-full bg-surface1-light dark:bg-surface1-dark"
  >
    <caption
      class="w-full bg-surface5-light dark:bg-surface5-dark"
    >
      <div class="flex">
        <h3
          class="py-3 px-5 text-start font-serif text-2xl font-bold"
        >
          {{ formattedDate }}
        </h3>
        <div
          class="ml-auto mr-2 mb-1 flex gap-x-2 self-end"
        >
          <CalendarShiftIcon
            name="ic:round-chevron-left"
            label="Previous month"
            @clicked="
              date = dateDayjs.subtract(1, 'month').toDate()
            "
          />
          <CalendarShiftIcon
            name="ic:round-chevron-right"
            label="Next month"
            @clicked="
              date = dateDayjs.add(1, 'month').toDate()
            "
          />
        </div>
      </div>
    </caption>
    <thead v-once class="grid grid-cols-7">
      <tr class="contents">
        <th
          v-for="day in daysOfWeek"
          :key="day[1]"
          class="pb-2 text-primary-light dark:text-primary-dark"
        >
          <span class="sm:hidden">{{ day[0] }}</span>
          <span class="hidden sm:inline">{{ day[1] }}</span>
        </th>
      </tr>
    </thead>
    <tbody class="grid grid-cols-7 gap-2">
      <template v-if="loadingData || events === null">
        <tr v-for="week in 6" :key="week" class="contents">
          <td v-for="day in 7" :key="day">
            <Placeholder class="pb-3"></Placeholder>
          </td>
        </tr>
      </template>
      <template v-else>
        <tr v-for="week in 6" :key="week" class="contents">
          <CalendarDay
            v-for="{ day, disabled, values } in days!.slice(
              (week - 1) * 7,
              week * 7,
            )"
            :key="day.unix()"
            :day="day"
            :events="values"
            :disabled="disabled"
            @clicked="
              (day, events) =>
                (selectedDay = { day, events })
            "
          >
          </CalendarDay>
        </tr>
      </template>
    </tbody>
  </table>
  <Teleport to="body" v-if="selectedDay !== null">
    <Dialog>
      <div class="w-full max-w-sm sm:w-96">
        <div
          class="bg-background overflow-x-hidden rounded-xl"
        >
          <div
            class="bg-surface4-light px-3 py-4 dark:bg-surface4-dark"
          >
            <div class="flex justify-end px-2 pb-3">
              <ButtonCloseIcon
                @clicked="selectedDay = null"
              >
              </ButtonCloseIcon>
            </div>
            <div class="flex flex-col gap-y-3">
              <slot
                v-for="event in selectedDay.events"
                :key="event.start.getTime()"
                :event="event"
              />
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  </Teleport>
</template>
