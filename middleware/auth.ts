export default defineNuxtRouteMiddleware(async () => {
  if (useCookie('credentials').value === undefined) {
    return navigateTo('/login')
  }

  if(useFirebaseUser().value === null && await $fetch('/api/shop/isAuth'))
    return navigateTo('/login')
})
