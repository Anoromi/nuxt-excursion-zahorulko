import { credentialsCookie } from "~~/server/utils/userCookie"

export default defineNuxtRouteMiddleware(async () => {
  if (useCookie(credentialsCookie).value === undefined) {
    return navigateTo('/login')
  }

  if(useFirebaseUser().value === null && await $fetch('/api/shop/isAuth'))
    return navigateTo('/login')
})
