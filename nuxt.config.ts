// https://nuxt.com/docs/api/configuration/nuxt-config

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
        lang: 'en'
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
    firebaseAuth: {
      type: 'service_account',
      project_id: 'nuxt-bureau',
      private_key_id:
        'e58a26af319d07ce827bdbee5fe8ec250bca7b81',
      private_key:
        '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDh2njyjqfblYaq\nnT3FiSxpcQra7XvY9jFhZD6lzTJC5Wd7L/zVLcsVlAnJKlOHsdE9jNbg04gWxs6i\nDPASNrFoATv9H4z8JrZ05GUumFRHX8+qc/wREKbIz9qHfdZI6Z1CD6HTsKtmelu8\nEVS+C3S7ZNrEX80Dqd8dZSocH5x7T+CyQAfrKbdE2FOq74kBBLiRrGCoj2qciTnG\nKvxWJ4X+2n/fccaB52K8fvk9FTqOgL2DaxydydwkncarbtLK7WTp63I5qqbLd4kC\nFkb+S6280M68m/MvTY06oiFrJgMCoje1icgzGbk1lTgKKrI6cM0KkS9dZIlC1eFS\nqyEcN5s/AgMBAAECggEAZi0hhJKXTBckenFyrbg2OGmkwJCp8+jFREtGsFnZwDvq\nieeW2ZbDBrsXhkO40G3YvKDH4aSxL6S3fMafoY3Oyr+sNQKeFMEq0E03nVHa5wNo\nfrPEOLAw1C58rcl3NTtDIszRqGSH1m/KqpWooeWq5NBmzGqO5HZocvL+jwSaFYqf\nAH1GtqRFQGi0nbHzRR3yzZwiTUMuw/rILSPLvuzSt4pWMnyur94k9Fo+nvKT2fQ/\nr9UJknWsKIcoEIaYuLUs5Ej8uSjW73P1eDUyJwZb2JbUlA7KJHQTs6GSee16ZwbO\noEm61PH+Rgk9pKL0RlnO6lYjtd2jEy0tFz3RCKu6WQKBgQD1Gf5yfwPx5KZ2ZNJs\n32hIyZQs+EmQ+qGp9RnJL0cGoZgRFPLeTgXLe7W7BBXLT3R1plxnOw9ho1LvcXRA\nXx6/MZ56JYi8FX33uMxz+kOiyP6f8aHAmcm2ZzBhtIUi/6FBTNMXVA1VKuDv2iUe\nUCtH20uVjgp8zaQC8oEc0/ywqwKBgQDr5WA3dJnIem9ZcOr/E3u/Zx9lJIn1Kn7M\nv/9Pd2D2aWG1a+qBwoob7J3fd7LiVDoofE2h2bdkBzDzJxkv716pyGD990wp9q6A\nSKb+l2gk7wO1P36qBV8FW+hvkKM87iibGZOiZyUF0Jllug3XdYRgRYN0+cuVEnne\nRLdgQn2HvQKBgDZjqUohE3AHLEVThDpyrQKR8Na11iVc6Kj9YdZ6LkmzbDpGKsrY\nB4MrFZ3Ff0yZeh9tZk3mFji1dH777y8lrH4C9cbnM1uBbW2eTYhi/cVO0uoNRbam\nqdNXPK5Bz9V/YnpKIQGpPjgrBrVS9C+w3JnaeQBb/8nIHGAnDi2mgQl3AoGBAMsw\nHfpmYvf+Dd9ale/0Vkj9iFtUZ8hXPDUcw8stJsXY66KbO7ldWhzHaQzNS7YLmrS4\nrR3WLFLqps0qRlW1tzJDONhIpMAYjSJOchklTT1S6zy5Xl8QlVJGYiWGzjRzZ2KB\nW1stwQQLM7Yd1kJaJRXPinW9nA/hhDthsRom6315AoGBAIv870nYbU9rGf4jsWXU\niDuKSOWce1elNMC0SZm4POMoML6lpt+vXglgVYnd8Di0ZgUGe10cVC0i6DNc6qqu\nYHQMWwj2BOnD5/WoEJsXpfLT8JK21muTzVgQ3QWcXlLsBb4x6rtiUI6XXTxz8LFf\n/M/iUXOa/g21/bg5o1cQXRpD\n-----END PRIVATE KEY-----\n',
      client_email:
        'firebase-adminsdk-44i4f@nuxt-bureau.iam.gserviceaccount.com',
      client_id: '116743782452386063483',
      auth_uri: 'https://accounts.google.com/o/oauth2/auth',
      token_uri: 'https://oauth2.googleapis.com/token',
      auth_provider_x509_cert_url:
        'https://www.googleapis.com/oauth2/v1/certs',
      client_x509_cert_url:
        'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-44i4f%40nuxt-bureau.iam.gserviceaccount.com',
    },
  },
})
