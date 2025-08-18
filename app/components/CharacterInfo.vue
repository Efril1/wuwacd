<script setup lang="ts">
const props = defineProps({
  bannerIndex: {
    type: Number,
    default: 0,
  },
});

const bannerStore = useBannerStore();
const banner = computed(() => bannerStore.getBanner(props.bannerIndex));
</script>

<template>
  <UCard class="overflow-hidden bg-black/20">
    <div class="flex flex-col md:flex-row">
      <!-- Left -->
      <div class="w-full md:w-1/2 flex items-center justify-center">
        <picture v-if="banner?.infoImageDesktop || banner?.infoImageMobile">
  <source
    media="(max-width: 767px)"
    :srcset="banner.infoImageMobile"
    class="w-full h-64 md:h-full object-cover object-right"
  />
  <img
    :src="banner.infoImageDesktop"
    alt="Character Information"
    class="w-full h-64 md:h-full object-cover rounded-2xl"
    style="object-position: 75% 80%;"
  />
</picture>

        <p v-else class="text-center p-4">No image provided</p>
      </div>

      <!-- Right -->
      <div
        class="w-full md:w-1/2 p-6 flex flex-col justify-center space-y-4 text-center md:text-left"
      >
        <h1 class="text-5xl font-extrabold pb-20">{{ banner?.bannerChar }}</h1>

        <h3 class="text-2xl font-bold">Character Info</h3>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <p class="text-sm text-gray-500">Name</p>
            <p class="font-medium">{{ banner?.characterInfo.name }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500">Attribute</p>
            <p class="font-medium">{{ banner?.characterInfo.element }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500">Weapon</p>
            <p class="font-medium">{{ banner?.characterInfo.weapon }}</p>
          </div>
          <p class="font-medium col-span-2">{{ banner?.characterInfo.about }}</p>
        </div>
      </div>
    </div>
  </UCard>
</template>
