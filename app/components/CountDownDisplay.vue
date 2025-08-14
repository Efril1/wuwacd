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
  <div class="text-center">
    <div v-if="timeLeft" class="timer-display">
      <div class="flex flex-wrap justify-center gap-x-6 gap-y-3 sm:gap-x-8">

        <div class="flex flex-col items-center">
          <NumberFlow
            :value="timeLeft.days"
            class="text-4xl sm:text-5xl md:text-6xl font-extrabold"
            :format="{ notation: 'standard', minimumIntegerDigits: 2 }"
          />
          <span class="text-sm sm:text-base font-light">DAYS</span>
        </div>

        <span class="colon text-4xl sm:text-5xl md:text-6xl font-extrabold sm:pt-2 md:pt-5">:</span>

        <div class="flex flex-col items-center">
          <NumberFlow
            :value="timeLeft.hours"
            class="text-4xl sm:text-5xl md:text-6xl font-extrabold"
            :format="{ notation: 'standard', minimumIntegerDigits: 2 }"
          />
          <span class="text-sm sm:text-base">HOURS</span>
        </div>

        <span class="colon text-4xl sm:text-5xl md:text-6xl font-extrabold sm:pt-2 md:pt-5">:</span>

        <div class="flex flex-col items-center">
          <NumberFlow
            :value="timeLeft.minutes"
            class="text-4xl sm:text-5xl md:text-6xl font-extrabold"
            :format="{ notation: 'standard', minimumIntegerDigits: 2 }"
          />
          <span class="text-sm sm:text-base">MINUTES</span>
        </div>

        <span class="colon text-4xl sm:text-5xl md:text-6xl font-extrabold sm:pt-2 md:pt-5">:</span>

        <div class="flex flex-col items-center">
          <NumberFlow
            :value="timeLeft.seconds"
            class="text-4xl sm:text-5xl md:text-6xl font-extrabold"
            :format="{ notation: 'standard', minimumIntegerDigits: 2 }"
          />
          <span class="text-sm sm:text-base">SECONDS</span>
        </div>
      </div>
    </div>
    <slot v-else name="finished"></slot>
  </div>
</template>

<style scoped>
.timer-display {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
    "Liberation Mono", "Courier New", monospace;
  margin-top: -100px;
}

@media (max-width: 768px) {
  .number {
    font-size: 3rem;
  }
  .colon {
    font-size: 2.5rem;
  }
}
</style>