<script setup lang="ts">

defineProps<{
  links: [string, string][]
}>()
</script>

<template>
  <ButtonExpand class="ml-3">
    <template #button>
      <slot/>
      <Icon
        name="majesticons:chevron-down-line"
        size="24px"
      ></Icon>
    </template>
    <template #items>
      <div
        class="bg-primary-container overflow-x-hidden rounded-b-xl rounded-t-lg "
      >
        <ul>
          <li
            v-for="([name, link], i) in links"
            :key="i"
          >
            <NuxtLink :to="link" class="header-link block">{{
              name
            }}</NuxtLink>
          </li>
        </ul>
      </div>
    </template>
  </ButtonExpand>
</template>

<style scoped lang="postcss">

.header-link {
  @apply hover:bg-primary highlight-none scale-100 rounded-md px-2 py-1 font-bold transition-all duration-500;
}
</style>