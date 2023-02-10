<script setup lang="ts">
import { TypedObj } from '~~/server/utils/helpers/typedObj'

useHead({
  title: 'Sign up',
  meta: [
    { name: 'description', content: 'Sign in to Anci' },
  ],
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
  | TypedObj<'loaded-error', { message: string }>

const state = ref({ type: 'idle' } as States)

async function onSubmit() {
  errors.email =
    verifyEmail(credentials.value.email) ?? undefined
  errors.password =
    verifyPassword(credentials.value.password) ?? undefined

  if (
    errors.email !== undefined ||
    errors.password !== undefined
  ) {
    state.value = {
      type: 'loaded-error',
      message: 'Given values are illegal',
    }
    return
  }
  state.value = { type: 'loading' }
  const result = await useSignUp(
    credentials.value.email,
    credentials.value.password,
  )
  if (result !== true) {
    state.value = { type: 'loaded-error', message: result }
    return
  }

  state.value = { type: 'success' }
  credentials.value = { email: '', password: '' }
}

const userStateMessage = computed(() => {
  if (state.value.type === 'idle') {
    return ''
  }
  if (state.value.type === 'success') {
    return 'Verification was sent on you email'
  }
  if (state.value.type === 'loading') {
    return 'Loading'
  }
  if (state.value.type === 'loaded-error') {
    return state.value.message
  }
  throw 'Unimplemented'
})
</script>

<template>
  <LoginScreen @submit.prevent="onSubmit()">
    <template #legend> Sign up </template>
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
      <ButtonPrimary> Sign up </ButtonPrimary>
    </template>
    <template #additional>
      <Transition name="info">
        <div
          v-if="state.type !== 'idle'"
          class="bg-secondary-container mx-4 mt-4 rounded-lg p-2 text-center font-serif text-xl font-bold transition-all duration-300 ease-out"
          :class="{
            'bg-error-container':
              state.type === 'loaded-error',
            'bg-green-300 text-black dark:bg-green-700 dark:text-white':
              state.type === 'success',
          }"
        >
          {{ userStateMessage }}
        </div>
      </Transition>
    </template>
  </LoginScreen>
</template>

<style lang="postcss" scoped>
.info-enter-active,
.info-leave-active {
  transition: transform 300ms ease-out;
}
.info-enter-from,
.info-leave-to {
  transform: scale(0);
}
</style>
