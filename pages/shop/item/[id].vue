<script setup lang="ts">
import { areStrings } from '~~/server/utils/isType'
import { ShopItemSelector } from '~~/server/utils/shopOptions'

definePageMeta({
  validate: (route) => {
    return areStrings(route.params['id'])
  },
})
const router = useRoute()
const itemId = router.params['id'] as string

const itemData = await $fetch(`/api/shop/item/${itemId}`, {
  query: {
    select: [
      'title',
      'description.short',
    ] as ShopItemSelector[],
  },
})

useHead({
  title: `${itemData.title}`,
  meta: [
    {
      name: 'description',
      content: itemData.description!.short,
    },
  ],
})
</script>

<template>
  <ShopItemScreen :shopItemId="itemId" />
</template>
