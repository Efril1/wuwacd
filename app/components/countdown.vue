<script setup lang="ts">
import FadeContent from "../../src/blocks/Animations/FadeContent/FadeContent.vue";

const props = defineProps({
  bannerIndex: {
    type: Number,
    default: 0,
  },
});

const bannerStore = useBannerStore();
const banner = computed(() => bannerStore.getBanner(props.bannerIndex));

const route = useRoute();
const isFirstPage = computed(() => route.name === "first");
</script>

<template>
  <div v-if="banner?.backgroundVideo" class="fixed inset-0 z-0">
    <video autoplay muted loop playsinline class="w-full h-full object-cover">
      <source :src="banner.backgroundVideo" type="video/mp4" />
    </video>
    <div class="absolute inset-0 bg-black/40"></div>
  </div>

  <div class="flex relative z-10">
    <div class="flex-1 flex flex-col">
      <div class="mx-auto">
        <div class="relative inline-block hover:[&>h2:first-child]:opacity-70">
          <h2
            class="chartext blurred-text absolute inset-0 blur-xl opacity-0 hover:opacity-80 scale-160 transition-all duration-300 pointer-events-none"
          >
            {{ banner?.bannerChar }}
          </h2>

          <NuxtLink :to="isFirstPage ? '/second' : '/first'">
            <h2 class="chartext relative">
              {{ banner?.bannerChar }}
            </h2>
          </NuxtLink>
        </div>
      </div>

      <div class="flex-1 place-items-center pt-25 p-4">
        <CountDownDisplay :bannerIndex="bannerIndex">
          <template #finished>
            <slot name="finished"></slot>
          </template>
        </CountDownDisplay>
      </div>

      <div v-if="banner" class="w-full max-w-2xl mx-auto scale-90">
        <div
          class="desktop-images absolute flex flex-col gap-2 top-6 -left-40 w-35 z-20"
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

        <!-- Mobile -->
        <div
          class="mobile-images flex flex-row justify-center items-center mx-auto gap-4 w-full max-w-2xl"
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

        <FadeContent
          :blur="true"
          :duration="500"
          :delay="200"
          :threshold="0.1"
          :initial-opacity="0"
          easing="ease-out"
          class-name="my-fade-content"
        >
          <div class="content-to-fade">
            <CharacterInfo :bannerIndex="bannerIndex" />
          </div>
        </FadeContent>
      </div>
    </div>
  </div>
</template>

<style scoped>
@font-face {
  font-family: "Genshin";
  src: url("/fonts/genshin.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

.timer-display {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
    "Liberation Mono", "Courier New", monospace;
}

.number {
  font-size: 5rem;
  font-weight: 800;
  line-height: 1;
}
.desktop-images {
  display: flex;
}
.mobile-images {
  display: none;
}

@media (max-width: 768px) {
  .number {
    font-size: 3rem;
  }
  .colon {
    font-size: 2.5rem;
  }
  .desktop-images {
    display: none;
  }
  .mobile-images {
    display: flex;
  }
}

.chartext {
  font-family: "Genshin", sans-serif;
  cursor: pointer;
  text-transform: uppercase;
  padding: 15px;
  font-size: 3rem;
}
.blurred-text {
  filter: blur(8px) brightness(0.9);
}
</style>
