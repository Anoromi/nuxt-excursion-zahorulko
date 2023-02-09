<script setup lang="ts">
defineProps<{
  items: { name: string; label: string }[]
  selected: Set<string>
}>()

const emit = defineEmits<{
  (event: 'add', name: string): void
  (event: 'remove', name: string): void
}>()

function update(name: string, value: boolean) {
  if (value) emit('add', name)
  else emit('remove', name)
}
</script>

<template>
  <div class="mx-2 flex flex-col gap-y-1">
    <div v-for="item in items" :key="item.name">
      <ShopCheckbox
        :name="item.name"
        :label="item.label"
        :initial="selected.has(item.name)"
        @changed="(value) => update(item.name, value)"
      />
    </div>
  </div>
</template>
