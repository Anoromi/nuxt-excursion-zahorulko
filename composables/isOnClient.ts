export const isOnServer = () =>
  useNuxtApp().ssrContext !== undefined
