<script setup lang="ts">

const opened = ref(false)
defineEmits<{
  (event: 'applyFilter'): void
}>()
</script>

<template>
  <Transition name="slide">
    <LazyShopSideBar
      v-if="opened"
      @close="opened = false"
      @apply-filter="$emit('applyFilter')"
    />
    <div v-else>
      <ShopShowHideButton
        :opened="false"
        @click="opened = !opened"
        class="fixed z-10 mt-2 rounded-r-2xl"
      />
    </div>
  </Transition>
</template>

<style scoped lang="postcss">

.slide-enter-from {
  transform: translateX(-100%);
}

.slide-leave-to {
  transform: translateX(-100%);
}

.slide-enter-active {
  transition: all 200ms ease;
}
.slide-leave-active {
  transition: all 400ms ease;
}
</style>
