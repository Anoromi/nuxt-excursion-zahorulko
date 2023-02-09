<script setup lang="ts">
defineProps<{
  promotions: string[]
}>()
</script>

<template>
  <div
    class="bg-secondary-container inline-block rounded-lg px-2 font-semibold"
    v-for="promotion in promotions"
    :key="promotion"
  >
    {{ promotion }}
  </div>
</template>
