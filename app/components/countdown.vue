<script setup lang="ts">
import { NuxtLink } from "#components";
import FadeContent from "../../src/blocks/Animations/FadeContent/FadeContent.vue";
import CountDownDisplay from "./CountDownDisplay.vue";

type ColorChoice =
  | "primary"
  | "info"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "neutral";

const props = defineProps({
  bannerIndex: {
    type: Number,
    default: 0,
  },
});

const bannerStore = useBannerStore();
const banner = computed(() => bannerStore.getBanner(props.bannerIndex));

const isHovered = ref(false);

const now = ref(new Date());
const timer = ref<NodeJS.Timeout | null>(null);
const route = useRoute();
const isFirstPage = computed(() => route.name === "first");

const timeLeft = computed(() => {
  if (!banner.value?.targetTime) return null;

  const diff = banner.value.targetTime.getTime() - now.value.getTime();

  if (diff <= 0) return null;

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
});

const updateTime = () => {
  now.value = new Date();
};

onMounted(() => {
  updateTime();
  timer.value = setInterval(updateTime, 1000);
});

onBeforeUnmount(() => {
  if (timer.value) clearInterval(timer.value);
});
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
        <CountDownDisplay
          :timeLeft="timeLeft"
          :colorChoice="banner?.colorChoice || 'primary'"
        >
          <template #finished>
            <slot name="finished"></slot>
          </template>
        </CountDownDisplay>
      </div>

      <div v-if="banner" class="w-full max-w-2xl mx-auto scale-90">
        <div class="absolute flex flex-col gap-2 top-6 -left-40 w-35 z-20">
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
            <UCard class="overflow-hidden bg-black/20">
              <div class="flex flex-col md:flex-row">
                <!-- Left -->
                <div class="w-full md:w-1/2 flex items-center justify-center">
                  <picture
                    v-if="banner.infoImageDesktop || banner.infoImageMobile"
                  >
                    <source
                      media="(max-width: 767px)"
                      :srcset="banner.infoImageMobile"
                    />
                    <img
                      :src="banner.infoImageDesktop"
                      alt="Character Information"
                      class="object-cover w-full h-64 md:h-full"
                    />
                  </picture>
                  <p v-else class="text-center p-4">No image provided</p>
                </div>

                <!-- Right -->
                <div class="w-full md:w-1/2 p-6 flex flex-col justify-center">
                  <div class="space-y-4 text-center md:text-left">
                    <h3 class="text-2xl font-bold">Character Info</h3>
                    <div class="grid grid-cols-2 gap-4">
                      <div>
                        <p class="text-sm text-gray-500">Name</p>
                        <p class="font-medium">
                          {{ banner.characterInfo.name }}
                        </p>
                      </div>
                      <div>
                        <p class="text-sm text-gray-500">Attribute</p>
                        <p class="font-medium">
                          {{ banner.characterInfo.element }}
                        </p>
                      </div>
                      <div>
                        <p class="text-sm text-gray-500">Weapon</p>
                        <p class="font-medium">
                          {{ banner.characterInfo.weapon }}
                        </p>
                      </div>
                    </div>
                    <p class="font-medium">{{ banner.characterInfo.about }}</p>
                  </div>
                </div>
              </div>
            </UCard>
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

@media (max-width: 768px) {
  .number {
    font-size: 3rem;
  }
  .colon {
    font-size: 2.5rem;
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
