import { DecodedIdToken } from 'firebase-admin/auth'
import { H3Event } from 'h3'
import { auth } from './firebase'
import { credentialsCookie } from './userCookie'

export async function checkValidity(
  token: string,
): Promise<DecodedIdToken | false> {
  try {
    return await auth.verifyIdToken(token)
  } catch (_) {
    return false
  }
}

export async function ensureVerifiedUser(event: H3Event) {
  const credentials = getCookie(event, credentialsCookie)
  if (credentials === undefined) {
    throw createError({
      statusCode: 401,
    })
  }
  try {
    return auth.verifyIdToken(credentials)
  } catch (_) {
    throw createError({
      statusCode: 401,
    })
  }
}