<script setup lang="ts">
import { enumToValues } from '~~/server/utils/helpers/enumOps'
import {
  SortDirections,
  SortOptions,
} from '~~/server/utils/pageQuery'

defineEmits<{
  (event: 'close'): void
  (event: 'applyFilter'): void
}>()

const info = await useShopInfo()
</script>

<template>
  <div
    class="fixed top-16 bottom-0 z-10 w-full overflow-x-hidden rounded-tr-2xl border-t-8 border-tertiary-light bg-background-light dark:border-tertiary-dark dark:bg-background-dark sm:w-72"
  >
    <div
      class="relative h-full overflow-y-auto bg-surface1-light pb-6 dark:bg-surface1-dark"
    >
      <ShopShowHideButton
        class="absolute -top-1 right-0 rounded-bl-2xl"
        :opened="true"
        @click="$emit('close')"
        size="40px"
      />
      <div class="flex">
        <h2
          class="ml-2 mt-3 text-4xl text-on-surface-light dark:text-on-surface-dark"
        >
          Filter
        </h2>
        <div class="ml-auto"></div>
      </div>
      <form @submit.prevent="$emit('applyFilter')">
        <label for="name" class="label mt-2"
          >Search
          <div>
            <input
              class="block w-full rounded-t-lg border-b-2 border-outline-light bg-surface2-light px-2 pt-1 focus-visible:border-primary-light focus-visible:outline-none dark:border-outline-dark dark:bg-surface2-dark dark:focus-visible:border-primary-dark"
              type="text"
              v-model.trim="info.filterData.name"
            />
          </div>
        </label>
        <fieldset class="mt-2">
          <legend class="label">Promotion</legend>
          <ShopCheckboxGroup
            :items="
              info.promotions.map((promotion) => {
                return {
                  name: promotion,
                  label: promotion,
                }
              })
            "
            :selected="info.filterData.selectedPromotions"
            @add="
              (v) =>
                info.filterData.selectedPromotions.add(v)
            "
            @remove="
              (v) =>
                info.filterData.selectedPromotions.delete(v)
            "
          />
        </fieldset>
        <label for="holidayTypes" class="label mt-2">
          Holiday types
        </label>
        <div class="mx-2 mt-2">
          <ShopOption
            :possible-values="info.holidayTypes"
            v-model="info.filterData.selectedType"
            name="holidayTypes"
            nullable
          >
          </ShopOption>
        </div>
        <label for="sortOptions" class="label mt-2">
          Sort
        </label>
        <div class="mx-2 mt-2 flex align-middle">
          <ShopOption
            :possible-values="
              enumToValues(SortOptions).map((v) => v)
            "
            v-model="info.filterData.sortOption"
            name="sortOptions"
          ></ShopOption>
          <button
            type="button"
            class="bg-secondary hover:bg-secondary-container highlight-none ml-auto inline-block h-8 w-8 rounded-full transition-colors duration-200"
            :aria-label="
              info.filterData.direction ===
              SortDirections.Ascending
                ? 'ascending'
                : 'descending'
            "
            @click="
              info.filterData.direction =
                info.filterData.direction ===
                SortDirections.Ascending
                  ? SortDirections.Descending
                  : SortDirections.Ascending
            "
          >
            <Icon
              v-if="
                info.filterData.direction ===
                SortDirections.Ascending
              "
              name="heroicons-solid:sort-ascending"
            />
            <Icon
              v-else
              name="heroicons-solid:sort-descending"
            />
          </button>
        </div>
        <ButtonPrimary class="mx-2 mt-4 text-center">
          Apply
        </ButtonPrimary>
      </form>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.label {
  @apply mx-2 block text-xl text-primary-light  dark:text-primary-dark;
}
</style>
