// https://nuxt.com/docs/api/configuration/nuxt-config

import {  readFileSync } from "fs";


export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    'nuxt-icon',
  ],

  css: ['~/assets/fonts.pcss', '~/assets/app.pcss'],
  colorMode: {
    classSuffix: '',
  },
  nitro: {
    preset: 'vercel',
    compressPublicAssets: true,
    minify: true,
  },
  postcss: {
    plugins: {
      'tailwindcss/nesting': {},
      'postcss-import': {},
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  imports: {
    dirs: ['./composables/**', './utils/**'],
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      link: [
        {
          rel: 'preconnect',
          href: 'https://loremflickr.com',
        },
        {
          rel: 'preconnect',
          href: 'https://apis.google.com',
        },
      ],
    },
  },
  runtimeConfig: {
    firebaseAuth: JSON.parse(readFileSync('./bureau-keys.json').toString('utf-8'))
  },
})
