<script setup lang="ts">
 withDefaults(
  defineProps<{
    opened: boolean
    size?: string
  }>(),
  {
    size: '48px',
  },
)

const emit = defineEmits<{
  (event: 'click'): void
}>()
</script>

<template>
  <Clickable
    @clicked="emit('click')"
    class="bg-tertiary-light text-on-tertiary-light dark:bg-tertiary-dark dark:text-on-tertiary-dark"
    :label="opened ? 'Collapse' : 'Expand'"
  >
    <Icon
      :name="
        opened
          ? 'material-symbols:chevron-left-rounded'
          : 'material-symbols:chevron-right-rounded'
      "
      :size="size"
    />
  </Clickable>
</template>
