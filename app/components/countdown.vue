<script setup lang="ts">
import type { TabsItem } from "@nuxt/ui";
import FadeContent from "../../src/blocks/Animations/FadeContent/FadeContent.vue";
type ColorChoice =
  | "primary"
  | "info"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "neutral";

const props = defineProps({
  targetTime: {
    type: Date,
    required: true,
  },
  bannerchar: {
    type: String,
    required: true,
  },
  infoImageDesktop: {
    type: String,
    default: "",
  },
  infoImageMobile: {
    type: String,
    default: "",
  },
  backgroundVideo: {
    type: String,
    default: "",
  },
  colorChoice: {
    type: String as PropType<ColorChoice>,
    default: "primary",
  },
  characterInfo: {
    type: Object as PropType<{
      name: string;
      element: string;
      weapon: string;
      about: string;
    }>,
    default: () => ({
      name: "Character Name",
      element: "Element",
      weapon: "Weapon Type",
      about: '"quote"—Character',
    }),
  },
});
const items = ref<TabsItem[]>([
  {
    label: "countdown",
    value: "countdown",
  },
  {
    label: "info",
    value: "info",
  },
]);

const now = ref(new Date());
const timer = ref<NodeJS.Timeout | null>(null);
const activeTab = ref("countdown");
const route = useRoute();
const isFirstPage = computed(() => route.name === 'first');



const timeLeft = computed(() => {
  const diff = props.targetTime.getTime() - now.value.getTime();

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
  <div v-if="backgroundVideo" class="fixed inset-0 z-0">
    <video autoplay muted loop playsinline class="w-full h-full object-cover">
      <source :src="backgroundVideo" type="video/mp4" />
    </video>
    <div class="absolute inset-0 bg-black/30"></div>
  </div>

  <div class="flex flex-col min-h-screen relative z-10">
    <!-- Tabs at top -->
    <div class="w-full max-w-2xl mx-auto pt-4">
      <UTabs
        :color="colorChoice || 'primary'"
        v-model="activeTab"
        :items="items"
      />
    </div>

    <!-- Countdown Content -->
    <div class="mx-auto">
      <NuxtLink :to="isFirstPage ? '/second' : '/first'">
      <h2 class="chartext">{{ bannerchar }}</h2>
      </NuxtLink>
    </div>
      <h2 class="mx-auto"> ↑ click to switch character</h2>
    <div
      v-if="activeTab === 'countdown'"
      class="flex-1 grid place-items-center p-4"
    >
      <div class="text-center">
        <div v-if="timeLeft" class="timer-display">
          <div class="flex flex-wrap gap-x-4 gap-y-2">
            <div class="flex flex-col">
              <div>
                <span class="number text-4xl sm:text-5xl font-extrabold">{{
                  String(timeLeft.days).padStart(2, "0")
                }}</span>
              </div>
              <span class="text-sm">DAYS</span>
            </div>

            <span class="text-4xl font-extrabold md:pt-4">:</span>

            <div class="flex flex-col">
              <span class="number text-4xl sm:text-5xl font-extrabold">{{
                String(timeLeft.hours).padStart(2, "0")
              }}</span>
              <span class="text-sm">HOURS</span>
            </div>

            <span class="text-4xl font-extrabold md:pt-4">:</span>

            <div class="flex flex-col">
              <span class="number text-4xl sm:text-5xl font-extrabold">{{
                String(timeLeft.minutes).padStart(2, "0")
              }}</span>
              <span class="text-sm">MINUTES</span>
            </div>

            <span class="text-4xl font-extrabold md:pt-4">:</span>

            <div class="flex flex-col">
              <span class="number text-4xl sm:text-5xl font-extrabold">{{
                String(timeLeft.seconds).padStart(2, "0")
              }}</span>
              <span class="text-sm">SECONDS</span>
            </div>
          </div>
        </div>
        <slot v-else name="finished"></slot>
      </div>
    </div>

    <div v-else-if="activeTab === 'info'" class="w-full max-w-2xl mx-auto">
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
                <picture v-if="infoImageDesktop || infoImageMobile">
                  <source
                    media="(max-width: 767px)"
                    :srcset="infoImageMobile"
                  />
                  <img
                    :src="infoImageDesktop"
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
                      <p class="font-medium">{{ characterInfo.name }}</p>
                    </div>
                    <div>
                      <p class="text-sm text-gray-500">Attribute</p>
                      <p class="font-medium">{{ characterInfo.element }}</p>
                    </div>
                    <div>
                      <p class="text-sm text-gray-500">Weapon</p>
                      <p class="font-medium">{{ characterInfo.weapon }}</p>
                    </div>
                  </div>
                  <p class="font-medium">{{ characterInfo.about }}</p>
                </div>
              </div>
            </div>
          </UCard>
        </div>
      </FadeContent>
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
  margin-top: -100px;
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
  color: #ffffff;
  text-transform: uppercase;
  padding: 15px;
  z-index: 1;
  animation: glow 1s ease-in-out infinite alternate;
  font-size: 3rem;
}
@keyframes glow {
  from {
    text-shadow: 0 0 10px #fff, 0 0 3px #fff, 0 0 3px #ffffff, 0 0 3px #ffffff,
      0 0 3px #ffffff, 0 0 10px #ffffff, 0 0 30px #ffffff;
  }
  to {
    text-shadow: 0 0 10px #fff, 0 0 3px #fff, 0 0 3px #ffffff, 0 0 3px #ffffff,
      0 0 1px #ffffff, 0 0 1px #ffffff, 0 0 70px #ffffff;
  }
}
</style>
