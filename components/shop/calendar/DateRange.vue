<script setup lang="ts">import dayjs from 'dayjs';

const props = defineProps<{
  start: Date,
  end : Date
}>()


const dateFormat = (date: Date) =>
  dayjs(date).locale('en').format('D (dddd), H:mm')

const startFormatted = computed(() => dateFormat(props.start))
const endFormatted = computed(() => dateFormat(props.end))
</script>

<template>
  <div
    class="font-serif text-secondary-light dark:text-secondary-dark"
  >
    <span>{{ startFormatted }}</span>
    <span class="px-2 font-bold">—</span>
    <br class="sm:hidden" />
    <span>{{ endFormatted }}</span>
  </div>
</template>
