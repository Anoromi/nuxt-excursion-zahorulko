<script setup lang="ts">
withDefaults(
  defineProps<{
    type?: 'submit' | 'reset' | 'button'
  }>(),
  { type: 'submit' },
)
defineEmits<{
  (event: 'clicked'): void
}>()
</script>
<template>
  <div
    class="transition-outline bg-primary mt-4 inline-block overflow-hidden rounded-3xl font-bold outline outline-0 outline-primary-light transition-colors hover:bg-primary-dark hover:text-on-primary-dark hover:outline-[5px] dark:bg-primary-dark dark:text-on-primary-dark dark:outline-primary-dark dark:hover:bg-primary-light dark:hover:text-on-primary-light"
  >
    <button
      class="highlight-none w-full px-8 py-1 text-lg"
      :type="type"
      @click="$emit('clicked')"
    >
      <slot />
    </button>
  </div>
</template>

<style scoped lang="postcss">
.transition-outline {
  transition: outline-width cubic-bezier(0.15, 1.51, 1, 1.3)
      300ms,
    background ease-out 400ms;
}
</style>
