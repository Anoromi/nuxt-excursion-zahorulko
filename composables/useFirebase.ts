import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  AuthError,
  sendEmailVerification,
  User,
} from 'firebase/auth'
import { Ref } from 'vue'

export async function useSignUp(
  email: string,
  password: string,
): Promise<true | string> {
  const auth = getAuth()
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password)
    await sendEmailVerification(res.user)

    return true
  } catch (error: any) {
    const authError = error as AuthError
    switch (authError.code) {
      case 'auth/email-already-in-use':
        return 'Email is already being used'
    }
    return ''
  }
}

export async function useSignIn(
  email: string,
  password: string,
): Promise<true | string> {
  const auth = getAuth()
  try {
    await signInWithEmailAndPassword(auth, email, password)

    return true
  } catch (error: any) {
    const authError = error as AuthError
    switch (authError.code) {
      case 'auth/invalid-email':
        return 'Email is invalid'
      case 'auth/wrong-password':
        return 'Wrong password'
      case 'auth/too-many-requests':
        return 'Too many attempts'
      case 'auth/user-not-found':
        return "User doesn't exist"
    }

    return ''
  }
}

export function useWatchAuth(listener: (user: User | null) => void) {
  const auth = getAuth()
  onAuthStateChanged(auth, (user) => {
    if (user !== null) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User

      const uid = user
      listener(uid)
    } else {
      listener(null)
    }
  })
}

export function useFirebaseUser() : Ref<User | null> {
  const auth = getAuth()
  const user = ref(auth.currentUser)
  useWatchAuth((newUser) => {
    user.value = newUser
  })
  return user
}

