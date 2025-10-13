<script setup>

useHead({
  script: [
    {
      src: '//pl27333916.profitableratecpm.com/1a/27/b2/1a27b26c8e8466dab313a1102cd2b5df.js',
      async: true,
      body: true
    }
  ]
})
</script>
<template>
  <main class="relative h-screen">
    <div class="h-full w-full overflow-auto">
      <slot />
    </div>

    <div class="relative flex mx-auto justify-center font-medium">
      <ULink>Made by&nbsp;</ULink>
    <ULink
      icon="i-lucide-github"
      variant="link"
      to="https://github.com/Efril1"
      target="_blank"
      class="text-white-100 hover:underline"
      >@Efril
      </ULink>
  </div>
  </main>
</template>