<script setup lang="ts">
import { useBannerStore } from '~/stores/bannerStore'

const props = defineProps({
  bannerIndex: {
    type: Number,
    default: 0,
  },
})

const bannerStore = useBannerStore()

const banner = computed(() => bannerStore.getBanner(props.bannerIndex))

const bannerIndexes = computed(() =>
  Array.from({ length: bannerStore.bannersCount }, (_, i) => i)
)

// Default placeholder image (can be an imported asset or data URL)
const placeholderImage = '/images/lethimcook.jpg'
</script>

<template>
  <div v-if="banner" class="max-w-2xl scale-90">
    <!-- Desktop Images -->
    <div class="desktop-images absolute flex-col gap-2 top-6 -left-50 w-35 z-20">
      <div class="max-h-100 overflow-y-auto pb-4
        [&::-webkit-scrollbar]:w-2
        [&::-webkit-scrollbar-thumb]:rounded-full
        [&::-webkit-scrollbar-thumb]:bg-transparent
        [&::-webkit-scrollbar-track]:bg-transparent
        hover:[&::-webkit-scrollbar-thumb]:bg-gray-300/30
        dark:hover:[&::-webkit-scrollbar-thumb]:bg-neutral-500/30
        transition-colors duration-300">
        <div class="space-y-2">
          <div
            v-for="i in bannerIndexes"
            :key="i"
            class="h-17 overflow-hidden rounded-2xl mb-2 last:mb-0"
          >
            <NuxtLink :to="{name:'chardetails', params: { bannerIndex: i }}">
              <img
                :src="banner[`infoImageMobile${i+1}`]|| placeholderImage"
                class="w-full h-full object-cover object-right-top transition-transform duration-300 hover:scale-150 origin-right"
                :class="{'object-contain': !banner[`infoImageMobile${i+1}`]}"
              />
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
    <!-- Mobile Images -->
    <div class="mobile-images flex flex-row items-center mx-auto gap-4 w-full max-w-2xl px-4">
      <div class="w-full overflow-x-auto pb-4
        [&::-webkit-scrollbar]:h-2
        [&::-webkit-scrollbar-thumb]:rounded-full
        [&::-webkit-scrollbar-thumb]:bg-transparent
        [&::-webkit-scrollbar-track]:bg-transparent
        hover:[&::-webkit-scrollbar-thumb]:bg-gray-300/30
        dark:hover:[&::-webkit-scrollbar-thumb]:bg-neutral-500/30
        transition-colors duration-300">
        <div class="flex space-x-2 w-max">
          <div
            v-for="i in bannerIndexes"
            :key="`mobile-${i}`"
            class="h-17 w-30 flex-shrink-0 overflow-hidden rounded-2xl"
          >
            <NuxtLink :to="{name:'chardetails', params: { bannerIndex: i }}">
              <img
                :src="banner[`infoImageMobile${i+1}`] || placeholderImage"
                class="w-full h-full object-cover object-right-top transition-transform duration-300 hover:scale-150 origin-right"
              />
            </NuxtLink>
          </div>
        </div>
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
