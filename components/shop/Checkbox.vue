<script setup lang="ts">
const props = defineProps<{
  name: string
  label: string
  initial?: boolean
}>()
const emit = defineEmits<{
  (event: 'changed', value: boolean): void
}>()

const isSelected = ref(props.initial ?? false)

const update = (e: boolean) => {
  emit('changed', e)
}
</script>

<template>
  <label :for="name">
    <span class="relative inline-block h-4 w-4 align-middle">
      <input
        type="checkbox"
        class="invisible"
        :name="name"
        :id="name"
        :value="isSelected"
        v-model="isSelected"
        @change="update(isSelected)"
      />
      <span class="checkbox"></span>
      <Icon
        v-if="isSelected"
        name="fluent:checkmark-12-filled"
        class="checkbox"
      />
    </span>
    <span class="ml-4 align-middle text-sm">{{ label }}</span>
  </label>
</template>

<style scoped lang="postcss">
label {
  @apply align-middle;
}

.checkbox {
  @apply hover:bg-primary absolute top-0 left-0 h-4 w-4 rounded-md outline outline-2 outline-on-background-light duration-500 dark:outline-on-background-dark;
  transition-property: color, background-color, outline-width, outline-color;
  transition-duration: 200ms;
  transition-timing-function: ease;
}

input[type='checkbox']:checked ~ .checkbox {
  @apply bg-primary outline-1 outline-offset-0 outline-primary-light dark:outline-primary-dark;
}
</style>
