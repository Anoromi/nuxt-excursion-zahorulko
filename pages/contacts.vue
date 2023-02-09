<script setup lang="ts">
import 'leaflet/dist/leaflet.css'
useHead({
  title: 'Contacts',
  meta: [
    {
      name: 'description',
      content: 'Anci, contacts',
    },
  ],
})

const mapDiv = ref(null as HTMLDivElement | null)
onMounted(async () => {
  const L = await import('leaflet')
  const map = L.map(mapDiv.value!).setView(
    [50.4643678, 30.5192533],
    19,
  )
  L.tileLayer(
    'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    {},
  ).addTo(map)
})
</script>

<template>
  <Head>
    <Style src="leaflet/dist/leaflet.css"></Style>
  </Head>
  <article class="mx-4 h-full w-full text-center sm:text-start scroll-auto pt-7 sm:mx-[15%]">
    <TextTitle> Our team </TextTitle>
    <dl class="my-4">
      <dt>
        <Icon
          name="material-symbols:design-services"
          size="30px"
        />
        Design
      </dt>
      <dd>Andrii Zahorulko</dd>
      <dt>
        <Icon
          name="material-symbols:code-blocks"
          size="30px"
        />
        Development
      </dt>
      <dd>Andrii Zahorulko</dd>
      <dt>
        <Icon
          name="material-symbols:location-on"
          size="30px"
        />
        Location
      </dt>
      <dd>Kyiv, Ukraine</dd>
    </dl>
    <div
      ref="mapDiv"
      class="aspect-video w-full sm:w-[500px]"
    ></div>
  </article>
</template>

<style scoped lang="postcss">
dt {
  @apply font-funky text-lg font-bold;
}
</style>
