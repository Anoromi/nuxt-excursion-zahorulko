<script setup lang="ts">
defineProps<{
  name: string
  label: string
}>()
defineEmits<{
  (event: 'clicked'): void
}>()
</script>

<template>
  <button
    :aria-label="label"
    @click="$emit('clicked')"
    class="highlight-none"
  >
    <Icon
      :name="name"
      size="32px"
      class="hover:bg-primary rounded-xl border-2 border-primary-light p-[1px] transition-colors duration-200 dark:border-primary-dark"
    />
  </button>
</template>
