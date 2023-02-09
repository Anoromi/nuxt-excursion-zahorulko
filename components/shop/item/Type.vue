<script setup lang="ts">
defineProps<{
  type: string
}>()
</script>

<template>
  <div
    class="mt-1 w-20 text-secondary-light dark:text-secondary-dark"
  >
    {{ type }}
  </div>
</template>
