import { initializeApp, cert, ServiceAccount } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { getAuth } from 'firebase-admin/auth'

export const app = initializeApp({
  credential: cert(useRuntimeConfig().firebaseAuth as ServiceAccount),
})

export const auth = getAuth(app)
export const firestore = getFirestore(app)
