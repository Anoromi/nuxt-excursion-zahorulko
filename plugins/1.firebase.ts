import { initializeApp } from 'firebase/app'

export default defineNuxtPlugin(() => {
  // TODO: Add SDKs for Firebase products that you want to use

  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration

  const firebaseConfig = {
    apiKey: 'AIzaSyDBcP2riRhBXLYKs6ia4HRxqKasRwtYnpo',

    authDomain: 'nuxt-bureau.firebaseapp.com',

    projectId: 'nuxt-bureau',

    storageBucket: 'nuxt-bureau.appspot.com',

    messagingSenderId: '716085940902',

    appId: '1:716085940902:web:4c54c903be3843b7825a67',
  }

  // Initialize Firebase

  initializeApp(firebaseConfig)
})
