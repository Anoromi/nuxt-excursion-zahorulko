<script setup lang="ts">
import { Ref } from 'vue'
import {
  pageQueryData,
  PageQueryData,
} from '~~/server/utils/pageQuery'
import { ShopItemData } from '~~/server/utils/shopOptions'

useHead({
  title: 'Anci - Shop',
  meta: [
    {name: 'description', content: 'View all our excursions'}
  ]
})

const info = await useShopInfo()
const queryData: Ref<PageQueryData> = ref({})

const { data: fetchData, pending: loadingData } =
  await useLazyFetch(`/api/shop/page`, {
    query: queryData,
  })

const { data: itemCount, pending: loadingItemCount } =
  await useLazyFetch('/api/shop/count', {
    query: queryData,
  })

const pageData = ref(fetchData.value)

watch(loadingData, (loading) => {
  if (!loading && pageData.value !== null) {
    pageData.value?.push(...fetchData.value!)
  } else if (!loading) {
    pageData.value = fetchData.value
  }
})

function updateQuery() {
  const filterData = info.value.filterData
  pageData.value = null
  queryData.value = {
    name:
      filterData.name.length !== 0
        ? filterData.name
        : undefined,
    type: filterData.selectedType ?? undefined,
    sortBy: filterData.sortOption ?? undefined,
    promotion: Array.from(
      filterData.selectedPromotions.values(),
    ),
    direction: filterData.direction,
  }
  pageQueryData.parse(queryData.value)
}

const wrapper: Ref<null | HTMLDivElement> = ref(null)
function loadMore() {
  if (
    pageData.value !== null ||
    pageData.value!.length !== 0
  )
    queryData.value.startId =
      pageData.value![pageData.value!.length - 1].id
}

const selectedItem = ref(null as ShopItemData | null)
</script>

<template>
  <div ref="wrapper" class="w-full">
    <ShopSideBarButton @apply-filter="updateQuery"></ShopSideBarButton>
    <ShopItemCards
      :page-data="pageData"
      :pending="pageData === null"
      @selected="(v) => (selectedItem = v)"
    />
    <div class="mx-7 mt-4 flex items-center justify-center">
      <button
        type="button"
        class="bg-secondary-container hover:bg-secondary rounded-xl px-10 py-2 font-bold transition-all duration-700 ease-out disabled:bg-inherit disabled:text-inherit hover:disabled:bg-inherit disabled:hover:text-inherit"
        @click="loadMore"
        v-if="
          !loadingItemCount &&
          pageData !== null &&
          pageData.length < itemCount!
        "
        :disabled="loadingData"
      >
        {{ loadingData ? 'loading' : 'more' }}
      </button>
    </div>
    <div class="pb-10" />
  </div>
  <Teleport to="body" v-if="selectedItem !== null">
    <Dialog>
      <div class="flex h-full w-full flex-col">
        <div class="flex w-full justify-end px-2 py-1">
          <ButtonCloseIcon
            @click="selectedItem = null"
          ></ButtonCloseIcon>
        </div>
        <div
          class="bg-background flex-1 overflow-x-hidden rounded-t-xl"
        >
          <ShopItemScreen
            :shop-item-id="selectedItem.id"
            :shop-item="selectedItem"
          />
        </div>
      </div>
    </Dialog>
  </Teleport>
</template>
