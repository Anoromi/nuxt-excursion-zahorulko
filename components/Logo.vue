<script setup lang="ts">
withDefaults(
  defineProps<{
    width?: string
    height?: string
  }>(),
  {
    height: '30px',
    width: '30px',
  },
)
</script>

<template>
  <svg
    :width="width"
    :height="height"
    version="1.1"
    viewBox="0 0 50 50"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g
      transform="matrix(1.3392 0 0 1.3392 -5.8189 -5.1546)"
      fill="#dac99e"
      stroke="#000102"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path
        d="m37.475 10.383v25c4 1-9 1-5 0v-25c-5-1 10-1 5 0z"
        stroke-width=".37795"
      />
      <g stroke-width=".25">
        <path d="m36.475 10.383v25" />
        <path d="m35.475 35.383v-25" />
        <path d="m34.475 35.383v-25" />
        <path d="m33.475 10.383v25" />
      </g>
      <path
        d="m30.475 9.3832c-2-3 8 6 4 4l-22 22c2 4-8-7-4-4z"
        stroke-width=".37795"
      />
      <g stroke-width=".25">
        <path d="m33.814 12.844-21.928 21.943" />
        <path d="m11.01 33.911 21.928-21.943" />
        <path d="m10.134 33.035 21.928-21.943" />
        <path d="m31.185 10.216-21.928 21.943" />
      </g>
      <g stroke-width=".37795">
        <path d="m12.475 35.383-4-4" />
        <path d="m34.475 13.383-4-4" />
        <path d="m32.475 10.383h5" />
        <path d="m32.475 35.383c1.4116-0.07823 3.3818-0.11533 5 0" />
      </g>
    </g>
  </svg>
</template>
