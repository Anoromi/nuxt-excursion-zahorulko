<template>
  <Transition name="blur" appear>
    <section
      class="background-style fixed top-0 left-0 right-0 bottom-0 z-40 flex items-center justify-center"
    >
      <slot />
    </section>
  </Transition>
</template>

<style lang="postcss" scoped>
.blur-enter-active,
.blur-leave-active {
  transition: all 400ms ease;
}

.background-style {
  @apply bg-surface-variant-light bg-opacity-10 backdrop-blur-sm dark:bg-surface-variant-dark dark:bg-opacity-10;
}

.blur-enter-to,
.blur-leave-from {
  @apply background-style;
}

.blur-enter-from,
.bluer-leave-to {
  backdrop-filter: blur(0px);
  transform: scale(1.1);
  filter: blur(4px);
  opacity: 0.3;
}
</style>
