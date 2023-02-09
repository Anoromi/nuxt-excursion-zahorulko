export default defineNuxtRouteMiddleware(() => {
  if (useCookie('credentials').value === undefined) {
    return navigateTo('/login')
  }
})
