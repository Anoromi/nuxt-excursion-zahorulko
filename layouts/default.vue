<script setup lang="ts">
const user = useFirebaseUser()

const links: [string, string][] = [
  ['Home', '/'],
  ['Shop', '/shop'],
  ['User', '/user'],
  ['My events', '/my-events'],
  ['Contacts', '/contacts']
]
</script>

<template>
  <header class="bg-surface fixed inset-x-0 top-0 z-30">
    <NuxtLoadingIndicator color="#656100" />
    <div
      class="flex h-12 items-baseline bg-surface3-light px-1 sm:px-3"
    >
      <NuxtLink href="/" class="contents">
        <Logo class="mt-2 block self-stretch" />
        <h2
          class="ml-2 font-funky text-2xl font-bold leading-[3rem] text-primary-light dark:text-primary-dark"
        >
          Anci
        </h2>
      </NuxtLink>
      <nav class="contents">
        <ul
          class="ml-5 hidden items-center self-center font-body sm:inline-flex sm:flex-row sm:gap-x-3"
        >
          <template
            v-for="[name, link] in links.slice(0, 2)"
            :key="name"
          >
            <li class="inline">
              <HeaderNavLink :to="link">
                {{ name }}
              </HeaderNavLink>
            </li>

            <span
              class="self-stretch border-l border-dashed border-outline-light dark:border-outline-dark"
              aria-hidden="true"
            ></span>
          </template>
          <li class="inline self-stretch">
            <HeaderDropdownLinks
              :links="links.slice(2)"
            >
              Other
            </HeaderDropdownLinks>
          </li>
        </ul>
        <HeaderDropdownLinks
          class="inline self-center sm:hidden"
          :links="links"
        >
          Shop</HeaderDropdownLinks
        >
      </nav>
      <div class="ml-auto self-center">
        <NuxtLink
          class="log-link text-primary-light outline outline-2 outline-primary-light transition-all hover:outline-4 dark:text-primary-dark dark:outline-primary-dark sm:px-10"
          href="/login"
          v-if="user === null"
        >
          Log in
        </NuxtLink>
        <NuxtLink
          href="/user"
          class="log-link bg-secondary-container"
          v-else
        >
          Logged in
        </NuxtLink>
      </div>
    </div>
  </header>
  <div class="mt-12 h-[calc(100vh-3rem)] overflow-auto">
    <main class="bg-background flex min-h-full">
      <slot />
    </main>
  </div>
</template>

<style scoped lang="postcss">
.log-link {
  @apply highlight-none block overflow-hidden rounded-lg px-2 py-1 text-center font-bold sm:px-8;
}
</style>
