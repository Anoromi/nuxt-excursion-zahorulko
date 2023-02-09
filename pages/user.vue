<script setup lang="ts">
import { getAuth } from '@firebase/auth'
useHead({
  title: 'User',
  meta: [
    { name: 'description', content: 'Your user account' },
  ],
})

definePageMeta({
  middleware: 'auth',
})
const user = useFirebaseUser()

async function logOut() {
  await getAuth().signOut()
  return navigateTo('/shop')
}
</script>

<template>
  <article class="mx-5 pt-8 sm:mx-[15%]">
    <TextTitle> User data </TextTitle>
    <div class="mt-4 flex flex-col gap-x-8 sm:flex-row">
      <div class="flex flex-col items-center">
        <Icon
          size="100px"
          name="mdi:user-circle"
          class="self-center text-primary-light dark:text-primary-dark sm:self-auto"
        />
        <ButtonPrimary @clicked="logOut" type="button">
          Log out
        </ButtonPrimary>
      </div>
      <dl>
        <dt>Email</dt>
        <dd>{{ user?.email }}</dd>
        <dt>Id</dt>
        <dd class="break-all">{{ user?.uid }}</dd>
      </dl>
    </div>
  </article>
</template>

<style scoped lang="postcss">
dt {
  @apply font-bold text-primary-light dark:text-primary-dark;
}
dd:not(:first-child) ~ dt {
  @apply mt-4;
}
</style>
