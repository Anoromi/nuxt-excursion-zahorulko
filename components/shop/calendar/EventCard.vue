<script setup lang="ts">
import { ExcursionCalendarEvent } from '~~/server/utils/dataGenerators/createCalendarEvents'
import { TypedObj } from '~~/server/utils/helpers/typedObj'

const props = defineProps<{
  event: ExcursionCalendarEvent
}>()

const {
  data: purchasedTickets,
  pending: loadingUsed,
  refresh: refreshPurchasedTickets,
} = useFetch(`/api/shop/item/event/count/${props.event.id}`)

const openForm = ref(false)
const ticketCount = ref(1)

type States =
  | TypedObj<'idle'>
  | TypedObj<'loading'>
  | TypedObj<'success'>
  | TypedObj<'error', { message: string }>

const state = ref({ type: 'idle' } as States)

async function purchaseTickets() {
  if (state.value.type === 'loading') return
  state.value = { type: 'loading' }
  try {
    await $fetch(
      `/api/shop/item/event/reserve/${props.event.id}`,
      {
        method: 'POST',
        headers: {
          ticket_count: ticketCount.value.toString(),
        },
      },
    )
    state.value = { type: 'success' }
    refreshPurchasedTickets()
  } catch (e: any) {
    state.value = {
      type: 'error',
      message: e.statusMessage,
    }
  }
}

const stateMessage = computed(() => {
  switch (state.value.type) {
    case 'idle':
      return ''
    case 'loading':
      return 'Loading'
    case 'success':
      return 'Success'
    case 'error':
      if (state.value.message === 'bad/ticketCount')
        return "Can't buy specified number of tickets"
      else throw 'Unreachable'
    default:
      throw 'Unreachable'
  }
})
</script>

<template>
  <section>
    <ShopCalendarDateRange
      :start="event.start"
      :end="event.end"
    ></ShopCalendarDateRange>
    <div class="flex py-1">
      <span class="text-xl">
        <Placeholder
          class="inline-block w-4 text-xl"
          v-if="loadingUsed"
        />
        <template v-else>
          <strong
            class="font-bold not-italic text-primary-light dark:text-primary-dark"
            >{{
              event.ticketLimit - purchasedTickets!
            }}</strong
          >
        </template>
        tickets left out of
        <strong
          class="font-bold not-italic text-primary-light dark:text-primary-dark"
          >{{ event.ticketLimit }}</strong
        >
      </span>
      <button
        class="highlight-none ml-auto inline-block overflow-visible rounded-[16%/32%] px-3 text-lg font-bold outline outline-2 outline-primary-light transition-all duration-500 ease-out hover:rounded-[50%/100%] dark:outline-primary-dark"
        type="button"
        @click="openForm = true"
        v-if="
          loadingUsed !== true &&
          purchasedTickets !== event.ticketLimit
        "
      >
        Buy
      </button>
    </div>
    <form
      v-if="openForm"
      class="mt-4 mb-8"
      @submit.prevent="purchaseTickets"
    >
      <fieldset>
        <legend class="sr-only">Purchase form</legend>
        <div class="flex justify-between">
          <label class="text-lg font-bold" for="count"
            >Ticket count</label
          >
          <input
            type="number"
            name="count"
            v-model="ticketCount"
            id="count"
            class="inline-block w-32 rounded-lg bg-surface2-light pl-2 pr-1 text-lg outline outline-1 outline-outline-light focus-visible:outline-2 focus-visible:outline-primary-light"
            min="1"
            :max="event.ticketLimit - purchasedTickets!"
          />
        </div>
        <div class="mt-2 flex items-center">
          <button
            class="bg-primary highlight-none hover:bg-primary-container rounded-xl px-3 py-1 text-lg transition-colors duration-500 ease-out"
          >
            Confirm
          </button>
          <div
            class="info-card w-20"
            :class="`${
              state.type === 'loading'
                ? 'bg-secondary-container'
                : state.type === 'success'
                ? 'bg-green-300 text-black dark:bg-green-600 dark:text-white'
                : state.type === 'error'
                ? 'bg-error-container'
                : ''
            }
               `"
            v-if="state.type !== 'idle'"
          >
            {{ stateMessage }}
          </div>
        </div>
      </fieldset>
    </form>
  </section>
</template>

<style scoped lang="postcss">
.info-card {
  @apply ml-auto w-36 rounded-lg px-2 py-1 text-center align-middle outline-dotted outline-outline-light transition-colors duration-500 dark:outline-outline-dark;
}
</style>
