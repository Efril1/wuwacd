<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import NumberFlow from "@number-flow/vue";

const props = defineProps({
  bannerIndex: {
    type: Number,
    default: 0,
  },
});

const bannerStore = useBannerStore();
const banner = computed(() => bannerStore.getBanner(props.bannerIndex));

const days = ref(0);
const hours = ref(0);
const minutes = ref(0);
const seconds = ref(0);

const timer = ref<NodeJS.Timeout | null>(null);

const containerRef = ref<HTMLElement | null>(null);
const scale = ref(1);
const baseWidth = 500;

const isEnded = ref(false);

const updateTime = () => {
  if (!banner.value?.targetTime) return;

  const diff = banner.value.targetTime.getTime() - new Date().getTime();
  if (diff <= 0) {
    days.value = hours.value = minutes.value = seconds.value = 0;
    isEnded.value = true;
    return;
  }

  days.value = Math.floor(diff / (1000 * 60 * 60 * 24));
  hours.value = Math.floor((diff / (1000 * 60 * 60)) % 24);
  minutes.value = Math.floor((diff / (1000 * 60)) % 60);
  seconds.value = Math.floor((diff / 1000) % 60);
  isEnded.value = false;
};

onMounted(() => {
  updateTime();
  timer.value = setInterval(updateTime, 1000);

  if (containerRef.value) {
    const ro = new ResizeObserver((entries) => {
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
      <div class="timer-display">
        <template v-if="!isEnded">
          <div class="flex flex-nowrap justify-center gap-x-6">
            <div class="flex flex-col items-center">
              <NumberFlow
                :value="days"
                class="text-6xl font-extrabold"
                :format="{ notation: 'standard', minimumIntegerDigits: 2 }"
              />
              <span class="text-base font-light">DAYS</span>
            </div>
            <span class="colon text-6xl font-extrabold pt-5">:</span>
            <div class="flex flex-col items-center">
              <NumberFlow
                :value="hours"
                class="text-6xl font-extrabold"
                :format="{ notation: 'standard', minimumIntegerDigits: 2 }"
              />
              <span class="text-base">HOURS</span>
            </div>
            <span class="colon text-6xl font-extrabold pt-5">:</span>
            <div class="flex flex-col items-center">
              <NumberFlow
                :value="minutes"
                class="text-6xl font-extrabold"
                :format="{ notation: 'standard', minimumIntegerDigits: 2 }"
              />
              <span class="text-base">MINUTES</span>
            </div>
            <span class="colon text-6xl font-extrabold pt-5">:</span>
            <div class="flex flex-col items-center">
              <NumberFlow
                :value="seconds"
                class="text-6xl font-extrabold"
                :format="{ notation: 'standard', minimumIntegerDigits: 2 }"
              />
              <span class="text-base">SECONDS</span>
            </div>
          </div>
        </template>

        <template v-else>
          <div class="flex justify-center items-center h-full">
            <span class="text-5xl font-extrabold"> is here!</span>
          </div>
        </template>
      </div>
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
