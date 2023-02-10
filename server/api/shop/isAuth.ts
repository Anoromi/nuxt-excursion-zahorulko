import { checkValidity as checkTokenValidity } from '~~/server/utils/authentication'
import { credentialsCookie } from '~~/server/utils/userCookie'

export default defineEventHandler(async (event) => {
  const credentials = getCookie(event, credentialsCookie)
  return (
    credentials !== undefined &&
    (await checkTokenValidity(credentials)) === false
  )
})
