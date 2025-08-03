<script setup lang="ts">
</script>

<template>
  <main class="relative h-screen">
    <div class="h-full w-full overflow-y-auto">
      <slot />
    </div>

    <div
      class="fixed bottom-0 left-1/2 -translate-x-1/2 p-4 z-50 flex items-center space-x-4"
    >
      <NuxtLink
        to="/first"
        class="relative w-40 h-20 rounded-md overflow-hidden opacity-35 hover:opacity-100 group"
      >
        <img
          src="/images/augustamobile.webp"
          class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300 ease-in-out"
          alt="Augusta"
        />
        <div
          class="absolute inset-0 flex items-center justify-center text-white text-xl font-semibold pointer-events-none"
        >
        </div>
      </NuxtLink>
      <NuxtLink
        to="/second"
        class="relative w-40 h-20 rounded-md overflow-hidden opacity-35 hover:opacity-100 group"
      >
        <img
          src="/images/iuno-mobile.webp"
          class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300 ease-in-out"
          alt="Iuno"
        />
        <div
          class="absolute inset-0 flex items-center justify-center text-white text-xl font-semibold pointer-events-none"
        >
        </div>
      </NuxtLink>
    </div>
  </main>
</template>