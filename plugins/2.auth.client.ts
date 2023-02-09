import { credentialsCookie } from '~~/server/utils/userCookie'

export default defineNuxtPlugin(() => {
  const userCookie = useCookie<string | undefined>(
    credentialsCookie,
    { maxAge: 60 * 60 * 24 },
  )

  useWatchAuth(async (user) => {
    userCookie.value =
      (await user?.getIdToken()) ?? undefined
  })
})
