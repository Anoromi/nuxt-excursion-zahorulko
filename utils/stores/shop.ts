import {
  SortDirections,
  SortOptions,
} from '~~/server/utils/pageQuery'

export function useShopInfo() {
  return useAsyncState(
    'shop-info',
    () => {
      return {
        promotions: [] as string[],
        holidayTypes: [] as string[],
        filterData: {
          selectedPromotions: new Set<string>(),
          selectedType: null as string | null,
          name: '',
          direction: SortDirections.Descending,
          sortOption: SortOptions.Price as SortOptions | null,
        },
        lastSeenItem: null as string | null,
      }
    },
    async (data) => {
      data.promotions = await $fetch('/api/shop/promotions')
      data.holidayTypes = await $fetch('/api/shop/products')
    },
  )
}
