<script setup lang="ts">
import { useServerHead } from '@unhead/vue'
import { sleep } from '~~/server/utils/helpers/sleep'
import { TypedObj } from '~~/server/utils/helpers/typedObj'

useServerHead({
  title: 'Sign in',
  meta: [
    { name: 'description', content: 'Sign in to Anci' },
  ],
})

const user = useFirebaseUser()

watch(user, async (currentUser) => {
  if (currentUser !== null) {
    await sleep(1000)
    return navigateTo('/')
  }
})

const credentials = useLoginCredentials()

const errors = reactive({
  email: undefined as undefined | string,
  password: undefined as undefined | string,
})

type States =
  | TypedObj<'idle'>
  | TypedObj<'loading'>
  | TypedObj<'success'>
  | (TypedObj<'error'> & { message: string })

const state = ref({ type: 'idle' } as States)

async function onSubmit() {
  errors.email =
    verifyEmail(credentials.value.email) ?? undefined
  errors.password =
    verifyPassword(credentials.value.password) ?? undefined

  if (
    credentials.value.email.match(
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    ) === null
  )
    errors.email = 'Invalid email address'

  if (credentials.value.password.length < 8)
    errors.password = 'Password has to be larger than 8'

  if (
    errors.email !== undefined ||
    errors.password !== undefined
  ) {
    state.value = {
      type: 'error',
      message: 'Illegal values',
    }
    return
  }
  state.value = { type: 'loading' }

  const result = await useSignIn(
    credentials.value.email,
    credentials.value.password,
  )
  if (result !== true) {
    state.value = { type: 'error', message: result }
    return
  }

  state.value = { type: 'success' }
}

const userStateMessage = computed(() => {
  switch (state.value.type) {
    case 'idle':
      return ''
    case 'loading':
      return 'Loading'
    case 'success':
      return 'Success'
    case 'error':
      return state.value.message
    default:
      throw 'Unreachable'
  }
})
</script>

<template>
  <LoginScreen @submit="onSubmit()">
    <template #legend> Log in </template>
    <template #fieldset>
      <LoginField
        name="email"
        label="Email"
        :error="errors.email"
        type="email"
        autocomplete="email"
        v-model.trim="credentials.email"
      >
      </LoginField>
      <LoginField
        class="mt-8"
        name="password"
        label="Password"
        :error="errors.password"
        type="password"
        autocomplete="current-password"
        v-model="credentials.password"
      >
      </LoginField>
    </template>
    <template #buttons>
      <ButtonPrimary> Sign in </ButtonPrimary>
      <div
        class="signup-transition highlight-none mt-4 inline-block overflow-hidden rounded-xl font-bold text-on-primary-container-light outline outline-2 outline-primary-light transition-colors hover:bg-primary-dark hover:text-on-primary-dark hover:outline-[5px] dark:text-on-primary-container-dark dark:outline-primary-dark dark:hover:bg-primary-light dark:hover:text-on-primary-light sm:ml-auto"
      >
        <NuxtLink
          class="block px-8 py-1 text-center align-middle text-base"
          href="/signup"
        >
          Sign up
        </NuxtLink>
      </div>
    </template>
    <template #additional>
      <Transition name="info">
        <div
          v-if="state.type !== 'idle'"
          :class="`bg-secondary-container mx-4  mt-4 rounded-lg p-2 text-center font-serif text-xl font-bold transition-all duration-300 ease-out
          ${
            state.type === 'error'
              ? 'bg-error-container'
              : ''
          } ${
            state.type === 'success'
              ? 'bg-green-300 text-black dark:bg-green-700 dark:text-white'
              : ''
          }`"
        >
          {{ userStateMessage }}
        </div>
      </Transition>
    </template>
  </LoginScreen>
</template>

<style lang="postcss" scoped>
.signup-transition {
  transition: outline-width cubic-bezier(0.15, 1.51, 1, 1.3)
      300ms,
    background ease-out 400ms;
}

.info-enter-active,
.info-leave-active {
  transition: transform 300ms ease-out;
}
.info-enter-from,
.info-leave-to {
  transform: scale(0);
}
</style>
