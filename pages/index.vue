<script setup lang="ts">
import { imageUrl } from '~~/server/utils/imageUrl'

useHead({
  title: 'Anci',
  meta: [
    {
      name: 'description',
      content: 'Anci, your new experiences',
    },
    {
      name: "google-site-verification",
      content: "I7BNdHaXymkS_z9hi36i6CsEF95lhGIWPgVRhApwMns"
    }
  ],
})

const { data: gallery, pending: loadingGallery } =
  await useLazyFetch('/api/shop/gallery', {
    query: {
      number: 20,
    },
  })

const scrollSpeed = computed(() => window.innerWidth / 4)
const galleryDiv = ref(null as null | HTMLDivElement)

function scrollGallery(x: number) {
  galleryDiv.value?.scrollBy({
    left: x,
    behavior: 'smooth',
  })
}
</script>

<template>
  <article class="min-h-full w-full bg-surface3-light dark:bg-surface3-dark">
    <section class="flex h-screen flex-col justify-center px-4 text-center sm:px-[15%]">
      <TextTitle class="text-6xl">Anci</TextTitle>
      <em class="font-serif text-3xl font-bold not-italic text-primary-light dark:text-primary-dark">
        Your experiences matter
      </em>
    </section>

    <section>
      <h2 class="text-center font-serif text-3xl font-bold">
        Our selection
      </h2>
      <div class="relative overflow-x-hidden rounded-3xl">
        <button class="highlight-none group absolute left-0 hidden h-full items-center sm:flex" aria-label="scroll left"
          type="button" @click="scrollGallery(-scrollSpeed)">
          <Icon name="ic:round-chevron-left" size="50px"
            class="group-hover:bg-primary ml-5 h-[30%] rounded-full text-transparent outline-2 outline-primary-container-light transition-colors duration-500 group-hover:outline dark:outline-primary-container-dark">
          </Icon>
        </button>
        <button class="highlight-none group absolute right-0 hidden h-full items-center sm:flex" aria-label="scroll right"
          type="button" @click="scrollGallery(scrollSpeed)">
          <Icon name="ic:round-chevron-right" size="50px"
            class="group-hover:bg-primary mr-5 h-[30%] rounded-full text-transparent outline-2 outline-primary-container-light transition-colors duration-500 group-hover:outline dark:outline-primary-container-dark">
          </Icon>
        </button>
        <div class="my-11 flex h-[400px] w-full items-center gap-x-3 overflow-x-auto px-3 sm:overflow-x-hidden"
          v-if="!loadingGallery" ref="galleryDiv">
          <img class="block max-h-[100%] max-w-[calc(70vw)] rounded-3xl" v-for="{
            photo: {
              id: pictureId,
              originalHeight,
              originalWidth,
            },
            id: itemId,
            title,
          } in gallery?.slice(0, 3)" :key="itemId" :src="imageUrl(
  pictureId,
  originalWidth,
  originalHeight,
)
  " :alt="title" :width="originalWidth" :height="originalHeight" loading="eager" />
          <img class="block max-h-[100%] max-w-[calc(70vw)] rounded-3xl" v-for="{
            photo: {
              id: pictureId,
              originalHeight,
              originalWidth,
            },
            id: itemId,
            title,
          } in gallery?.slice(3)" :key="itemId" :src="imageUrl(
  pictureId,
  originalWidth,
  originalHeight,
)
  " :alt="title" :width="originalWidth" :height="originalHeight" loading="lazy" />
        </div>
      </div>
    </section>
  </article>
</template>
