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
  <div v-if="banner" class="max-w-2xl scale-90">
    <!-- Desktop Images -->
    <div
      class="desktop-images absolute flex-col gap-2 top-6 -left-50 w-35 z-20"
    >
      <div class="h-17 overflow-hidden rounded-2xl">
        <NuxtLink to="/first">
          <img
            :src="banner.infoImageMobile1"
            class="w-full h-full object-cover object-right-top transition-transform duration-300 hover:scale-150 origin-right"
          />
        </NuxtLink>
      </div>
      <div class="h-17 overflow-hidden rounded-2xl">
        <NuxtLink to="/second">
          <img
            :src="banner.infoImageMobile2"
            class="w-full h-full object-cover object-right-top transition-transform duration-300 hover:scale-150 origin-right"
          />
        </NuxtLink>
      </div>
    </div>

    <!-- Mobile Images -->
    <div
      class="mobile-images flex flex-row items-center mx-auto gap-4 w-full max-w-2xl"
    >
      <div class="h-17 overflow-hidden rounded-2xl">
        <NuxtLink to="/first">
          <img
            :src="banner.infoImageMobile1"
            class="w-full h-full object-cover object-right-top transition-transform duration-300 hover:scale-150 origin-right"
          />
        </NuxtLink>
      </div>
      <div class="h-17 overflow-hidden rounded-2xl">
        <NuxtLink to="/second">
          <img
            :src="banner.infoImageMobile2"
            class="w-full h-full object-cover object-right-top transition-transform duration-300 hover:scale-150 origin-right"
          />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.desktop-images {
  display: flex;
}
.mobile-images {
  display: none;
}

@media (max-width: 768px) {
  .desktop-images {
    display: none;
  }
  .mobile-images {
    display: flex;
  }
}
</style>
