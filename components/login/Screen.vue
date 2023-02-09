<script setup lang="ts">
defineEmits<{
  (event: 'submit', payload: Event): void
}>()
</script>
<template>
  <div
    class="flex w-full content-center items-center"
  >
    <img
      src="/ansi-login.webp"
      alt="Background image"
      class="bottom-0 hidden select-none sm:fixed sm:block"
      loading="lazy"
      draggable="false"
    />
    <form
      class="bg-primary-container relative z-10 mx-6 max-w-sm flex-1 rounded-xl bg-opacity-80 pt-8 pb-7 dark:bg-opacity-80"
      @submit.prevent="
        (payload) => $emit('submit', payload)
      "
      novalidate="true"
    >
      <legend>
        <TextTitle class="mx-8">
          <slot name="legend"></slot>
        </TextTitle>
      </legend>
      <fieldset class="pt-10">
        <slot name="fieldset" />
      </fieldset>
      <div
        class="flex flex-col items-stretch px-[5%] sm:flex-row sm:items-center"
      >
        <slot name="buttons" />
      </div>
      <slot name="additional" />
    </form>
  </div>
</template>
