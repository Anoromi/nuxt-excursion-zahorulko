<script setup lang="ts">
defineProps<{
  to: string
}>()
</script>

<template>
  <NuxtLink
    :to="to"
    class="hover:bg-primary highlight-none inline scale-100 rounded-md px-2 py-1 font-bold transition-all duration-500"
  >
    <slot />
  </NuxtLink>
</template>

<style scoped lang="postcss"></style>
