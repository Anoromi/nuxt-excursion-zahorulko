<script setup lang="ts"></script>

<template>
  <div class="group relative">
    <button
      type="button"
      class="highlight-none block w-full rounded-lg py-1 pl-2 font-bold outline outline-1 outline-primary-light transition-all hover:outline-2 dark:outline-primary-dark"
    >
      <slot name="button"> </slot>
    </button>
    <div
      class="absolute left-2/4 hidden w-max max-w-none -translate-x-2/4 overflow-x-visible group-hover:block group-active:block"
    >
      <slot name="items" />
    </div>
  </div>
</template>

<style scoped lang="postcss"></style>
