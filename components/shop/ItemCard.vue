<script setup lang="ts">
import { imageUrl } from '~~/server/utils/imageUrl'
import { ShortShopItemData } from '~~/server/utils/shopOptions'

withDefaults(
  defineProps<{
    data?: ShortShopItemData
    lazy?: boolean
  }>(),
  { lazy: false },
)

defineEmits<{
  (event: 'selected'): void
}>()
</script>

<template>
  <template v-if="data === undefined">
    <section class="card">
      <div class="relative">
        <div
          class="absolute top-0 flex w-full flex-wrap justify-end p-2"
        >
          <Placeholder
            class="bg-secondary-container block w-20 px-2 font-semibold"
          ></Placeholder>
        </div>
        <Placeholder class="image-card h-48"></Placeholder>
      </div>
      <div class="mx-4">
        <Placeholder
          class="mt-2 w-56 font-serif text-3xl"
        />
        <Placeholder
          class="placeholder-color placeholder mt-1 w-20"
        />
        <Placeholder
          class="placeholder-color placeholder mt-2 mb-4 h-12 w-full"
        />
      </div>
    </section>
  </template>
  <template v-else>
    <section class="card">
      <div class="relative">
        <img
          class="image-card"
          alt="excursion image"
          :src="imageUrl(data.photo.id, 320, 200)"
          width="320"
          height="200"
          :loading="lazy ? 'lazy' : 'eager'"
        />
        <div
          class="absolute top-0 flex w-full flex-wrap justify-end p-2"
        >
          <ShopItemPromotion :promotions="data.promotion" />
        </div>
      </div>
      <div class="mx-4">
        <em
          class="mt-2 block text-ellipsis font-serif text-xl not-italic"
        >
          <NuxtLink :href="`/shop/item/${data.id}`" custom>
            <a
              :href="`/shop/item/${data.id}`"
              class="highlight-none hover:text-primary-light hover:underline hover:dark:text-primary-dark"
              @click.prevent="$emit('selected', data!)"
            >
              {{ data.title }}
            </a>
          </NuxtLink>
        </em>
        <ShopItemType :type="data.type" />
        <strong class="font-bold">
          {{ data.price.normal }}$
        </strong>
        <div class="mt-2 max-h-12 w-full overflow-hidden">
          {{ data.description.short }}
        </div>
      </div>
      <div
        class="bg-primary-container mt-2 mr-16 inline-block rounded-tr-xl py-1 px-2"
      >
        {{
          `${data.location.region}, ${data.location.country}`
        }}
      </div>
    </section>
  </template>
</template>

<style lang="postcss" scoped>
.card {
  @apply hover:bg-primary-container hover:shadow-primary-container-light dark:hover:shadow-primary-container-dark w-full overflow-hidden rounded-2xl   bg-surface3-light transition-all duration-500 hover:shadow-[0_0px_20px_10px_rgba(0,0,0,0)] sm:mx-0 sm:w-full;
  .image-card {
    @apply w-full rounded-b-2xl bg-surface5-light;
    content-visibility: auto;
  }
}
</style>
