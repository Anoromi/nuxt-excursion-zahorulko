<script setup lang="ts">
import { imageUrl } from '~~/server/utils/imageUrl'
import {
  ExtraShopItemData,
  extraShopItemSelector,
  ShopItemData,
  ShortShopItemData,
  shortShopItemSelector,
} from '~~/server/utils/shopOptions'

const props = defineProps<{
  shopItemId: string
  shopItem?: ShopItemData
}>()

const { data: fetchedShortData } = await useLazyFetch(
  `/api/shop/item/${props.shopItemId}`,
  {
    query: {
      select: shortShopItemSelector,
    },
    onResponseError: async (error) => {
      if (error.response.statusText === 'bad/id')
        await navigateTo('/shop')
    },
  },
)
const { data: fetchedExtraData } = await useLazyFetch(
  `/api/shop/item/${props.shopItemId}`,
  {
    query: {
      select: extraShopItemSelector,
    },
    onResponseError: async (error) => {
      if (error.response.statusText === 'bad/id')
        await navigateTo('/shop')
    },
  },
)

const data = ref(
  (props.shopItem ??
    fetchedShortData.value) as ShortShopItemData | null,
)
const extraData = ref(
  (fetchedExtraData.value ?? null) as ExtraShopItemData,
)

watch(fetchedShortData, (value) => {
  data.value = value as ShortShopItemData
})
watch(fetchedExtraData, (value) => {
  extraData.value = value as ExtraShopItemData
})

const loadingData = computed(() => data.value === null)
const loadingExtra = computed(
  () => extraData.value === null,
)
</script>

<template>
  <article class="w-full pb-32">
    <Placeholder
      v-if="loadingData"
      class="aspect-[16/10] w-full sm:hidden"
    />
    <img
      v-else
      :src="imageUrl(data!.photo.id, 320, 200)"
      class="aspect-[16/10] w-full rounded-lg sm:hidden"
      alt="main image"
    />

    <div>
      <Placeholder
        v-if="loadingExtra"
        class="mx-4 mt-8 hidden h-[375px] w-[600px] sm:block"
      />
      <img
        :src="imageUrl(data!.photo.id, 600, 375)"
        class="mx-4 mt-8 hidden rounded-xl sm:block"
        width="600"
        height="375"
        v-else
      />

      <div class="mx-4 mt-4">
        <div>
          <ShopItemPromotion
            v-if="!loadingData"
            :promotions="data!.promotion"
          />
        </div>
        <Placeholder
          v-if="loadingData"
          class="mt-2 w-44 font-serif text-3xl"
        />
        <h1 v-else class="mt-2 font-serif text-3xl">
          {{ data?.title }}
        </h1>
        <Placeholder v-if="loadingData" />
        <ShopItemType :type="data!.type" v-else />
        <Placeholder v-if="loadingData" />
        <button
          class="bg-primary hover:bg-primary-container highlight-none mt-2 rounded-xl px-2 py-1 text-xl font-bold transition-colors duration-200 ease-out"
          type="button"
          @click="
            navigateTo(`/shop/item/calendar/${shopItemId}`)
          "
        >
          Reserve
        </button>
        <Placeholder
          v-if="loadingExtra"
          class="mt-2 h-36 w-72 text-lg"
        />
        <p class="text-lg" v-else>
          {{ extraData!.description.full }}
        </p>
        <div
          v-if="!loadingExtra"
          class="grid w-full grid-cols-[repeat(auto-fit,minmax(auto,400px))] items-center justify-center gap-x-3 gap-y-5 pt-5"
        >
          <img
            v-for="image in extraData.gallery"
            :src="
              imageUrl(
                image.id,
                image.originalWidth,
                image.originalHeight,
              )
            "
            :key="image.id"
            :width="image.originalWidth"
            :height="image.originalHeight"
            alt="excursion image"
            class="rounded-2xl outline-primary-light outline-dashed  dark:outline-primary-dark"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  </article>
</template>
