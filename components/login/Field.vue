<script setup lang="ts">
defineProps<{
  name: string
  label: string
  error?: string
  autocomplete?: string
  type: string
  modelValue: string
}>()

defineEmits<{
  (event: 'update:modelValue', value: string): void
}>()
</script>

<template>
  <div
    :class="`input-field relative mx-4 ${
      error !== undefined ? 'error-label' : ''
    }`"
  >
    <label :for="name" class="text-label">{{ label }}</label>
    <input
      :type="type"
      :autocomplete="autocomplete"
      :name="name"
      :value="modelValue"
      :id="name"
      @input="(e) => $emit('update:modelValue', (e.target as HTMLInputElement).value)"
    />
    <div class="mx-2 mt-1 text-error-light dark:text-error-dark">
      {{ error ?? '' }}
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.input-field > input {
  @apply block w-full rounded-lg bg-transparent px-4 pt-2 pb-1 outline-dotted outline-2 outline-outline-light focus:rounded-xl focus-visible:rounded-xl focus-visible:outline-none focus-visible:outline-dashed focus-visible:outline-2 focus-visible:outline-on-primary-container-light dark:focus-visible:outline-on-primary-container-dark;
  transition-property: outline border-radius;
  transition-duration: 300ms;
  transition-timing-function: ease-out;
}
.input-field > .text-label {
  @apply absolute -top-[1.1rem] left-[10px] rounded-full  border border-surface5-light bg-primary-container-light px-2 text-base font-semibold dark:border-surface5-dark dark:bg-primary-container-dark;
}

.error-label > input {
  @apply outline-error-light dark:outline-error-dark;
}

.error-label > .text-label {
  @apply bg-error;
}
</style>
