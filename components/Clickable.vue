<script setup lang="ts">
defineProps<{
  label?: string
}>()
defineEmits<{
  (event: 'clicked'): void
}>()
</script>

<template>
  <button
    class="highlight-none inline overflow-hidden p-0"
    type="button"
    @click="$emit('clicked')"
    :aria-label="label"
  >
    <Hoverable>
      <slot />
    </Hoverable>
  </button>
</template>
