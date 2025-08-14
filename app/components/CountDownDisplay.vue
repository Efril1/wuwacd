<script setup lang="ts">
import NumberFlow from "@number-flow/vue";

const props = defineProps({
  bannerIndex: {
    type: Number,
    default: 0,
  },
});

const bannerStore = useBannerStore();
const banner = computed(() => bannerStore.getBanner(props.bannerIndex));

const now = ref(new Date());
const timer = ref<NodeJS.Timeout | null>(null);

const scale = ref(1);
const containerRef = ref<HTMLElement | null>(null);
const baseWidth = 500;

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

  if (containerRef.value) {
    const ro = new ResizeObserver(entries => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        scale.value = Math.min(1, width / baseWidth);
      }
    });
    ro.observe(containerRef.value);
  }
});

onBeforeUnmount(() => {
  if (timer.value) clearInterval(timer.value);
});
</script>

<template>
  <div ref="containerRef" class="scale-container">
    <div class="timer-wrapper" :style="{ transform: `scale(${scale})` }">
      <div v-if="timeLeft" class="timer-display">
        <div class="flex flex-nowrap justify-center gap-x-6">
          <div class="flex flex-col items-center">
            <NumberFlow
              :value="timeLeft.days"
              class="text-6xl font-extrabold"
              :format="{ notation: 'standard', minimumIntegerDigits: 2 }"
            />
            <span class="text-base font-light">DAYS</span>
          </div>
          <span class="colon text-6xl font-extrabold pt-5">:</span>
          <div class="flex flex-col items-center">
            <NumberFlow
              :value="timeLeft.hours"
              class="text-6xl font-extrabold"
              :format="{ notation: 'standard', minimumIntegerDigits: 2 }"
            />
            <span class="text-base">HOURS</span>
          </div>
          <span class="colon text-6xl font-extrabold pt-5">:</span>
          <div class="flex flex-col items-center">
            <NumberFlow
              :value="timeLeft.minutes"
              class="text-6xl font-extrabold"
              :format="{ notation: 'standard', minimumIntegerDigits: 2 }"
            />
            <span class="text-base">MINUTES</span>
          </div>
          <span class="colon text-6xl font-extrabold pt-5">:</span>
          <div class="flex flex-col items-center">
            <NumberFlow
              :value="timeLeft.seconds"
              class="text-6xl font-extrabold"
              :format="{ notation: 'standard', minimumIntegerDigits: 2 }"
            />
            <span class="text-base">SECONDS</span>
          </div>
        </div>
      </div>
      <slot v-else name="finished"></slot>
    </div>
  </div>
</template>

<style scoped>
.scale-container {
  width: 100%;
  display: flex;
  justify-content: center;
}
.timer-wrapper {
  transform-origin: top center;
}
.timer-display {
  font-family: "Genshin";
  margin-top: -100px;
}
</style>
