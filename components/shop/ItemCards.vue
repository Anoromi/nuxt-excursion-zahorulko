<script setup lang="ts">
import { ShopItemData, ShortShopItemData } from '~~/server/utils/shopOptions'

defineProps<{
  pageData: ShortShopItemData[] | null
  pending: boolean
}>()

defineEmits<{
  (event: 'selected', item: ShopItemData): void
}>()
</script>

<template>
  <div class="overflow-auto">
    <div
      class="grid w-full pb-8 grid-cols-[repeat(auto-fill,minmax(auto,320px))] items-start justify-evenly gap-x-5 gap-y-3 pt-16"
    >
      <template v-if="pending">
        <ShopItemCard
          v-for="value in Array(6)"
          :key="value"
        >
        </ShopItemCard>
      </template>
      <template v-else>
        <ShopItemCard
          v-for="item in pageData?.slice(0, 2)"
          :key="item.id"
          :data="item"
          @selected="(e) => $emit('selected', e)"
        ></ShopItemCard>
        <LazyShopItemCard
          v-for="item in pageData?.slice(2)"
          :key="item.id"
          :data="item"
          @selected="(e) => $emit('selected', e)"
          lazy
        ></LazyShopItemCard>
      </template>
    </div>
  </div>
</template>
