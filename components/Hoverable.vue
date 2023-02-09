<template>
  <div
    class="hover:bg-white hover:bg-opacity-30 dark:hover:bg-black dark:hover:bg-opacity-30"
  >
    <slot/>
  </div>
</template>

<style>
.button-overlay:hover {
  background-color: rgba(255, 255, 255, 0.3);
  box-sizing: content-box;
}

.dark .button-overlay:hover {
  background-color: rgba(0, 0, 0, 0.3);
}
</style>
