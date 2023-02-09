<script setup lang="ts">
defineEmits<{
(event: 'clicked'): void
}>()
</script>

<template>
  <button
    class="bg-primary highlight-none hover:bg-primary-container flex h-10 w-14 items-center justify-center rounded-full transition-colors duration-200 ease-out"
    aria-label="close"
    @click="$emit('clicked')"
  >
    <Icon name="mingcute:close-fill" size="28px" />
  </button>
</template>
