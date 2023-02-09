<script setup lang="ts">
withDefaults(
  defineProps<{
    text?: string
  }>(),
  {
    text: ' ',
  },
)
</script>

<template>
  <div
    class="placeholder-color placeholder-animation whitespace-pre-wrap rounded-lg"
  >
    {{ text }}
  </div>
</template>

