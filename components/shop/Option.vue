<script setup lang="ts">
withDefaults(
  defineProps<{
    modelValue: string | null
    possibleValues: string[]
    name: string
    nullable?: boolean
  }>(),
  {
    nullable: false,
  },
)
const emit = defineEmits<{
  (event: 'update:modelValue', value: string | null): void
}>()

function update(value: string) {
  emit('update:modelValue', value.length > 0 ? value : null)
}
</script>

<template>
  <div>
    <span class="relative">
      <Icon
        name="tabler:chevron-down"
        :size="'24px'"
        class="pointer-events-none absolute right-2 top-0 text-on-primary-container-light dark:text-on-primary-container-dark"
      />
      <select
        :name="name"
        class="bg-primary-container hover:bg-primary appearance-none rounded-lg pl-2 pr-8 text-lg transition-all duration-1000 hover:rounded-2xl"
        :value="modelValue"
        @input="(e) => update((e.target! as HTMLSelectElement).value)"
      >
        <option v-if="nullable">Any</option>
        <option
          v-for="possibleValue in possibleValues"
          :key="possibleValue"
          :value="possibleValue"
        >
          {{ possibleValue }}
        </option>
      </select>
    </span>
  </div>
</template>
